import { useState, useRef, useEffect } from 'react';
import { Hymn, searchHymnsByName, searchHymnsByNumber, getHymnByNumber, getHymnByName } from '@/shared/hymns-data';
import { usePublicHymns } from '../hooks/usePublicHymns';
import { Plus } from 'lucide-react';

interface HymnAutocompleteProps {
  hymn: { number: string; name: string };
  onChange: (number: string, name: string) => void;
  placeholder?: string;
  index: number;
}

export default function HymnAutocomplete({ hymn, onChange, placeholder, index }: HymnAutocompleteProps) {
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [numberSuggestions, setNumberSuggestions] = useState<Hymn[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<Hymn[]>([]);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(-1);
  const [selectedNameIndex, setSelectedNameIndex] = useState(-1);
  const [isAddingNewHymn, setIsAddingNewHymn] = useState(false);
  
  const numberInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const numberDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);
  
  const { addPublicHymn } = usePublicHymns();

  // Handle number input change
  const handleNumberChange = (value: string) => {
    onChange(value, hymn.name);
    
    if (value.trim()) {
      const suggestions = searchHymnsByNumber(value);
      setNumberSuggestions(suggestions);
    } else {
      setNumberSuggestions([]);
      // Clear name when number is cleared
      onChange(value, '');
    }
  };

  // Handle name input change
  const handleNameChange = (value: string) => {
    // Force uppercase
    const upperValue = value.toUpperCase();
    onChange(hymn.number, upperValue);
    
    if (upperValue.trim()) {
      const suggestions = searchHymnsByName(upperValue);
      setNameSuggestions(suggestions);
    } else {
      setNameSuggestions([]);
      // Clear number when name is cleared
      onChange('', upperValue);
    }
  };

  // Handle adding new hymn to Hinário A
  const handleAddNewHymn = async (hymnName: string) => {
    try {
      setIsAddingNewHymn(true);
      const newHymn = await addPublicHymn(hymnName);
      // Update current selection with the new hymn
      onChange(newHymn.number, newHymn.name);
      // Close dropdown
      setNameSuggestions([]);
      setIsNameFocused(false);
    } catch (error) {
      console.error('Failed to add new hymn:', error);
      // You could add error handling UI here if needed
    } finally {
      setIsAddingNewHymn(false);
    }
  };

  // Check if we should show "add new hymn" option
  const shouldShowAddOption = (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) return false;
    // Don't show if we're not focused on name field
    if (!isNameFocused) return false;
    return true;
  };

  // Handle suggestion selection
  const selectNumberSuggestion = (suggestion: Hymn) => {
    onChange(suggestion.number, suggestion.name);
    setNumberSuggestions([]);
    setSelectedNumberIndex(-1);
    // Keep focus to allow immediate editing if needed
    numberInputRef.current?.blur();
  };

  const selectNameSuggestion = (suggestion: Hymn) => {
    onChange(suggestion.number, suggestion.name);
    setNameSuggestions([]);
    setSelectedNameIndex(-1);
    // Keep focus to allow immediate editing if needed
    nameInputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleNumberKeyDown = (e: React.KeyboardEvent) => {
    if (numberSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedNumberIndex(prev => 
          prev < numberSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedNumberIndex(prev => 
          prev > 0 ? prev - 1 : numberSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedNumberIndex >= 0) {
          selectNumberSuggestion(numberSuggestions[selectedNumberIndex]);
        } else if (numberSuggestions.length > 0) {
          selectNumberSuggestion(numberSuggestions[0]);
        }
        break;
      case 'Escape':
        setNumberSuggestions([]);
        setIsNumberFocused(false);
        setSelectedNumberIndex(-1);
        break;
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (nameSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedNameIndex(prev => 
          prev < nameSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedNameIndex(prev => 
          prev > 0 ? prev - 1 : nameSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedNameIndex >= 0) {
          selectNameSuggestion(nameSuggestions[selectedNameIndex]);
        } else if (nameSuggestions.length > 0) {
          selectNameSuggestion(nameSuggestions[0]);
        }
        break;
      case 'Escape':
        setNameSuggestions([]);
        setIsNameFocused(false);
        setSelectedNameIndex(-1);
        break;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        numberDropdownRef.current &&
        !numberDropdownRef.current.contains(event.target as Node) &&
        !numberInputRef.current?.contains(event.target as Node)
      ) {
        setNumberSuggestions([]);
        setIsNumberFocused(false);
        setSelectedNumberIndex(-1);
      }
      
      if (
        nameDropdownRef.current &&
        !nameDropdownRef.current.contains(event.target as Node) &&
        !nameInputRef.current?.contains(event.target as Node)
      ) {
        setNameSuggestions([]);
        setIsNameFocused(false);
        setSelectedNameIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-px bg-gray-200">
      {/* Number Field */}
      <div className="bg-white relative">
        <input
          ref={numberInputRef}
          type="text"
          value={hymn.number}
          onChange={(e) => handleNumberChange(e.target.value)}
          onFocus={() => {
            setIsNumberFocused(true);
            // Show suggestions for existing value when focusing
            if (hymn.number.trim()) {
              const suggestions = searchHymnsByNumber(hymn.number);
              setNumberSuggestions(suggestions);
            }
          }}
          onKeyDown={handleNumberKeyDown}
          placeholder={`${index + 1}`}
          className="w-full px-2 py-1.5 text-center border-none focus:ring-1 focus:ring-red-500 focus:outline-none text-base"
          maxLength={5}
        />
        
        {/* Number Suggestions Dropdown */}
        {isNumberFocused && numberSuggestions.length > 0 && (
          <div
            ref={numberDropdownRef}
            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10 max-h-32 overflow-y-auto"
          >
            {numberSuggestions.map((suggestion, idx) => (
              <div
                key={`${suggestion.number}-${suggestion.name}`}
                className={`px-2 py-1.5 cursor-pointer hover:bg-red-50 ${
                  idx === selectedNumberIndex ? 'bg-red-100' : ''
                }`}
                onClick={() => selectNumberSuggestion(suggestion)}
              >
                <div className="font-semibold text-center text-base">{suggestion.number}</div>
                <div className="text-sm text-gray-600 text-center truncate">
                  {suggestion.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name Field */}
      <div className="bg-white col-span-3 relative">
        <input
          ref={nameInputRef}
          type="text"
          value={hymn.name}
          onChange={(e) => handleNameChange(e.target.value)}
          onFocus={() => {
            setIsNameFocused(true);
            // Show suggestions for existing value when focusing
            if (hymn.name.trim()) {
              const suggestions = searchHymnsByName(hymn.name);
              setNameSuggestions(suggestions);
            }
          }}
          onKeyDown={handleNameKeyDown}
          placeholder={placeholder || "Digite o nome do hino..."}
          className="w-full px-2 py-1.5 border-none focus:ring-1 focus:ring-red-500 focus:outline-none uppercase text-base"
          maxLength={60}
        />
        
        {/* Name Suggestions Dropdown */}
        {isNameFocused && (nameSuggestions.length > 0 || shouldShowAddOption(hymn.name)) && (
          <div
            ref={nameDropdownRef}
            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10 max-h-32 overflow-y-auto"
          >
            {nameSuggestions.map((suggestion, idx) => (
              <div
                key={`${suggestion.number}-${suggestion.name}`}
                className={`px-2 py-1.5 cursor-pointer hover:bg-red-50 flex justify-between items-center ${
                  idx === selectedNameIndex ? 'bg-red-100' : ''
                }`}
                onClick={() => selectNameSuggestion(suggestion)}
              >
                <span className="truncate flex-1 text-base">{suggestion.name}</span>
                <span className="text-sm text-red-600 font-semibold ml-2">#{suggestion.number}</span>
              </div>
            ))}
            
            {/* Add new hymn option - always at bottom, requires scrolling to see */}
            {shouldShowAddOption(hymn.name) && (
              <>
                {/* Visual separator and scroll indicator */}
                <div className="px-2 py-0.5 bg-gray-50 border-t border-gray-100 text-center sticky top-0 bg-opacity-90 backdrop-blur-sm">
                  <div className="text-sm text-gray-500 flex items-center justify-center">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-0.5"></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-0.5"></span>
                  </div>
                </div>
                
                <div
                  className="px-2 py-2 cursor-pointer hover:bg-blue-50 border-t border-blue-200 bg-blue-25 relative"
                  onClick={() => handleAddNewHymn(hymn.name)}
                >
                  <div className="flex items-center text-blue-600">
                    <Plus className="w-3 h-3 mr-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        Adicionar "{hymn.name}" ao Hinário A
                      </div>
                      <div className="text-sm text-blue-500">
                        {isAddingNewHymn ? 'Adicionando...' : 'Clique para criar este novo hino'}
                      </div>
                    </div>
                  </div>
                  {/* Visual separator line */}
                  <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
