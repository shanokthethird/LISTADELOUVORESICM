import { useState } from 'react';
import { Share, Download, Calendar, Music, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import HymnAutocomplete from './HymnAutocomplete';
import PublicHymnSubmission from './PublicHymnSubmission';
import { usePublicHymns } from '../hooks/usePublicHymns';

interface HymnEntry {
  number: string;
  name: string;
}

export default function HymnForm() {
  // Auto-fill with today's date
  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [date, setDate] = useState(getTodayDate());
  const [hymns, setHymns] = useState<HymnEntry[]>(
    Array(10).fill(0).map(() => ({ number: '', name: '' }))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHymnSubmission, setShowHymnSubmission] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPixQR, setShowPixQR] = useState(false);
  
  // Load public hymns on mount
  usePublicHymns();

  

  // Helper function to generate canvas with the hymn form
  const generateCanvas = async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas não suportado pelo navegador');
    }
    
    // Set canvas size to match A4 proportions
    canvas.width = 800;
    canvas.height = 1000;
    
    // Fill background with light gray
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load and draw the ICM logo
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    
    // Wait for logo to load with timeout
    await new Promise<void>((resolve) => {
      let loaded = false;
      
      logo.onload = () => {
        if (!loaded) {
          loaded = true;
          try {
            const logoWidth = 200;
            const logoHeight = 50;
            const logoX = 60;
            const logoY = 30;
            ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
            console.log('Logo carregada com sucesso!');
          } catch (err) {
            console.error('Erro ao desenhar logo:', err);
          }
          resolve();
        }
      };
      
      logo.onerror = () => {
        if (!loaded) {
          loaded = true;
          console.warn('Erro ao carregar logo, continuando sem ela');
          resolve();
        }
      };
      
      // Timeout after 3 seconds
      setTimeout(() => {
        if (!loaded) {
          loaded = true;
          console.warn('Timeout ao carregar logo, continuando sem ela');
          resolve();
        }
      }, 3000);
      
      logo.src = 'https://mocha-cdn.com/019a0e21-7681-799d-ae71-7b2a4c76424c/logoicm.png';
    });
    
    // Form positioning below the logo
    const formX = 60;
    const formY = 100;
    const formWidth = canvas.width - 120;
    const formHeight = 600;
    
    // Draw main form border with black lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(formX, formY, formWidth, formHeight);
    
    // Header section with "LOUVORES" and "Data"
    const headerHeight = 60;
    ctx.lineWidth = 2;
    ctx.strokeRect(formX, formY, formWidth, headerHeight);
    
    // Divide header into two sections
    ctx.strokeRect(formX, formY, formWidth * 0.6, headerHeight);
    ctx.strokeRect(formX + formWidth * 0.6, formY, formWidth * 0.4, headerHeight);
    
    // Fill header background with white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(formX + 1, formY + 1, formWidth - 2, headerHeight - 2);
    
    // Text in header - larger fonts
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('LOUVORES', formX + 15, formY + 40);
    
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Data: ${date}`, formX + formWidth * 0.6 + 15, formY + 40);
    
    // Column headers
    const columnHeaderY = formY + headerHeight;
    const columnHeaderHeight = 50;
    const numberColumnWidth = 120;
    
    // Draw column header borders with black lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(formX, columnHeaderY, numberColumnWidth, columnHeaderHeight);
    ctx.strokeRect(formX + numberColumnWidth, columnHeaderY, formWidth - numberColumnWidth, columnHeaderHeight);
    
    // Fill column headers with gray background
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(formX + 1, columnHeaderY + 1, numberColumnWidth - 2, columnHeaderHeight - 2);
    ctx.fillRect(formX + numberColumnWidth + 1, columnHeaderY + 1, formWidth - numberColumnWidth - 2, columnHeaderHeight - 2);
    
    // Column header text - larger font
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N°', formX + numberColumnWidth / 2, columnHeaderY + 35);
    ctx.fillText('Nome do Hino', formX + numberColumnWidth + (formWidth - numberColumnWidth) / 2, columnHeaderY + 35);
    
    // Draw data rows
    const rowHeight = 55;
    const dataStartY = columnHeaderY + columnHeaderHeight;
    
    // Draw all 10 rows
    for (let i = 0; i < 10; i++) {
      const y = dataStartY + (i * rowHeight);
      
      // Row borders with black lines
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(formX, y, numberColumnWidth, rowHeight);
      ctx.strokeRect(formX + numberColumnWidth, y, formWidth - numberColumnWidth, rowHeight);
      
      // Fill row background (white)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(formX + 1, y + 1, numberColumnWidth - 2, rowHeight - 2);
      ctx.fillRect(formX + numberColumnWidth + 1, y + 1, formWidth - numberColumnWidth - 2, rowHeight - 2);
      
      // Fill hymn data if present
      const hymn = hymns[i];
      if (hymn && (hymn.number || hymn.name)) {
        ctx.fillStyle = '#000000';
        
        // Number column - larger font
        if (hymn.number) {
          ctx.font = 'bold 20px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(hymn.number, formX + numberColumnWidth / 2, y + 37);
        }
        
        // Name column - larger font
        if (hymn.name) {
          ctx.font = '20px Arial, sans-serif';
          ctx.textAlign = 'left';
          
          // Simple text rendering without word wrap for cleaner look
          const text = hymn.name.substring(0, 30);
          ctx.fillText(text, formX + numberColumnWidth + 15, y + 37);
        }
      }
    }
    
    return canvas;
  };

  const generateImage = async () => {
    setIsGenerating(true);
    
    try {
      const canvas = await generateCanvas();
      
      // Convert canvas to data URL and download
      const dataURL = canvas.toDataURL('image/png');
      
      // Create download link
      const link = document.createElement('a');
      link.download = `louvores-${date.replace(/\//g, '-')}.png`;
      link.href = dataURL;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert('Imagem gerada e baixada com sucesso!');
      
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Erro ao gerar a imagem. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareWhatsApp = async () => {
    setIsGenerating(true);
    
    try {
      const canvas = await generateCanvas();
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Falha ao criar blob'));
          }
        }, 'image/png');
      });
      
      const fileName = `louvores-${date.replace(/\//g, '-')}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });
      
      // Build text message
      const hymnList = hymns
        .filter(h => h.number && h.name)
        .map(h => `${h.number} - ${h.name}`)
        .join('\n');
      const message = `Louvores ICM - ${date}\n\n${hymnList}`;
      
      // Try to use Web Share API if available
      if (navigator.share && navigator.canShare) {
        try {
          const canShareFiles = navigator.canShare({ files: [file] });
          
          if (canShareFiles) {
            await navigator.share({
              title: 'Lista de Louvores ICM',
              text: message,
              files: [file]
            });
            
            setIsGenerating(false);
            return;
          }
        } catch (shareError) {
          console.log('Web Share API não suportou arquivos, usando fallback');
        }
      }
      
      // Fallback: download image and open WhatsApp with text
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataURL;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Open WhatsApp with text message
      const encodedMessage = encodeURIComponent(`${message}\n\n📎 Imagem baixada automaticamente - anexe manualmente no WhatsApp`);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
      
      alert('Imagem baixada! Anexe manualmente no WhatsApp junto com a mensagem.');
      
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      
      // Final fallback: text-only sharing
      try {
        const hymnList = hymns
          .filter(h => h.number && h.name)
          .map(h => `${h.number} - ${h.name}`)
          .join('\n');
        const message = encodeURIComponent(`Louvores ICM - ${date}\n\n${hymnList}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        alert('Não foi possível gerar a imagem. Compartilhando apenas o texto.');
      } catch (fallbackError) {
        alert('Erro ao compartilhar. Por favor, tente novamente.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (value: string) => {
    // Format as DD/MM/YYYY
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 to-red-100 p-2 flex flex-col overflow-hidden">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-3 flex-shrink-0">
          <img 
            src="https://mocha-cdn.com/019a0e21-7681-799d-ae71-7b2a4c76424c/logoicm.png" 
            alt="Igreja Cristã Maranata" 
            className="h-10 mx-auto mb-2"
          />
          <h1 className="text-xl font-bold text-red-800 mb-1">Lista de Louvores</h1>
          <p className="text-base text-red-600">Preencha os dados e gere sua imagem</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-3 flex-1 flex flex-col overflow-hidden">
          {/* Date Input */}
          <div className="mb-3 flex-shrink-0">
            <label className="flex items-center text-base font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 mr-1 text-red-600" />
              Data do Culto
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(formatDate(e.target.value))}
              placeholder="DD/MM/AAAA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
              maxLength={10}
            />
          </div>

          {/* Hymns Table */}
          <div className="flex-1 flex flex-col min-h-0 mb-3">
            <div className="mb-2 flex-shrink-0">
              <label className="flex items-center text-base font-medium text-gray-700">
                <Music className="w-4 h-4 mr-1 text-red-600" />
                Hinos e Louvores
              </label>
            </div>
            
            <div className="border border-gray-300 rounded-md overflow-hidden flex-1 flex flex-col">
              {/* Table Header */}
              <div className="bg-gray-100 grid grid-cols-4 gap-px flex-shrink-0">
                <div className="bg-gray-200 px-2 py-2 text-center font-semibold text-gray-700 text-base">N°</div>
                <div className="bg-gray-200 px-2 py-2 col-span-3 font-semibold text-gray-700 text-base">Nome do Hino</div>
              </div>
              
              {/* Table Rows - 8 rows */}
              <div className="flex-1 overflow-y-auto">
                {hymns.map((hymn, index) => (
                  <HymnAutocomplete
                    key={index}
                    hymn={hymn}
                    onChange={(number, name) => {
                      const newHymns = [...hymns];
                      newHymns[index] = { number, name };
                      setHymns(newHymns);
                    }}
                    placeholder="Digite o nome do hino..."
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={generateImage}
              disabled={isGenerating || !date}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  Gerar Imagem
                </>
              )}
            </button>
            
            <button
              onClick={shareWhatsApp}
              disabled={isGenerating || !date}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <img 
                    src="https://mocha-cdn.com/019a16fc-9d5d-7091-af6b-6b2a07ed8b71/WhatsApp_Logo_PNG_Sem_Fundo_Transparente.png" 
                    alt="WhatsApp" 
                    className="w-4 h-4 mr-1" 
                  />
                  WhatsApp
                </>
              )}
            </button>
          </div>
        </div>

        {/* Public Hymn Submission Form */}
        {showHymnSubmission && (
          <div className="mb-2">
            <PublicHymnSubmission onClose={() => setShowHymnSubmission(false)} />
          </div>
        )}

        {/* Instructions Button - Fixed at bottom */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-md hover:bg-white/90 transition-colors flex items-center justify-between shadow-sm"
          >
            <h3 className="font-medium text-gray-700 text-base">Como usar?</h3>
            <div className="flex items-center justify-center w-5 h-5 bg-gray-200 rounded border border-gray-300">
              {showInstructions ? (
                <ChevronDown className="w-3 h-3 text-gray-600" />
              ) : (
                <Plus className="w-3 h-3 text-gray-600" />
              )}
            </div>
          </button>
          
          {/* Instructions Overlay */}
          {showInstructions && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 h-96 overflow-y-auto">
              <div className="p-4 text-base text-gray-600">
                <h4 className="font-semibold text-gray-800 mb-2 text-base">Como usar o aplicativo:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Preencha a data do culto no formato DD/MM/AAAA</li>
                  <li>Digite os números ou nomes dos louvores nas caixas de texto</li>
                  <li>O sistema irá sugerir automaticamente os hinos conforme você digita</li>
                  <li>Use as setas ↑↓ para navegar nas sugestões e Enter para selecionar</li>
                  <li>Clique em "Gerar Imagem" para baixar a lista formatada</li>
                  <li>Use "WhatsApp" para compartilhar diretamente no aplicativo</li>
                  <li>Você pode preencher quantos louvores quiser (até 8)</li>
                </ol>
                
                <h4 className="font-semibold text-gray-800 mt-4 mb-2 text-base">Tipos de hinos disponíveis:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Hinário Principal:</strong> Digite apenas o número (ex: 1, 25, 150)</li>
                  <li><strong>Coletânea das CIA:</strong> Digite "C" antes do número (ex: C1, C15, C100)</li>
                  <li><strong>Coletânea Avulsa(pública):</strong> Digite "A" antes do número (ex: A1, A5, A20)</li>
                  <li><strong>Busca por nome:</strong> Digite parte do nome do hino</li>
                </ul>

                <div className="mt-3 p-2 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-blue-700 text-base">
                    💡 <strong>Dica:</strong> Ao digitar o número do louvor, o nome será preenchido automaticamente se o hino estiver na coletânea.
                  </p>
                </div>
                
                <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-yellow-700 text-base">
                    ⚠️ <strong>Importante:</strong> Caso o louvor não conste na coletânea, há um botão, como última opção, para adicioná-lo à coletânea avulsa.
                  </p>
                </div>

                <div className="mt-2 p-2 bg-purple-50 border-l-4 border-purple-400 rounded">
                  <div className="flex items-center justify-between">
                    <p className="text-purple-700 text-base">
                      🌟 <strong>Adicionar à Coletânea Avulsa(pública):</strong> Não encontrou um hino? Contribua adicionando-o à coletânea avulsa.
                    </p>
                    <button
                      onClick={() => setShowHymnSubmission(!showHymnSubmission)}
                      className="flex items-center justify-center w-6 h-6 ml-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm font-bold flex-shrink-0"
                      title="Adicionar Hino"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-gray-50 border border-gray-200 rounded">
                  <p className="text-gray-600 text-sm">
                    📧 <strong>Suporte:</strong> Em caso de dúvidas, erros ou sugestões, envie email para <strong>xxshanok3xx@gmail.com</strong>
                  </p>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 text-sm font-medium">
                      💚 <strong>Doe para continuar o projeto:</strong>
                    </p>
                    <button
                      onClick={() => setShowPixQR(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold text-sm"
                    >
                      PIX
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PIX QR Code Modal */}
      {showPixQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">PIX para Doação</h3>
                <button
                  onClick={() => setShowPixQR(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">Escaneie o código QR abaixo para fazer sua doação via PIX:</p>
                <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block">
                  <img 
                    src="https://mocha-cdn.com/019a16fc-9d5d-7091-af6b-6b2a07ed8b71/IMG-20251024-WA0161-1-.jpg"
                    alt="QR Code PIX para doação"
                    className="w-full max-w-xs mx-auto"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Sua doação ajuda a manter este projeto funcionando e permite novas melhorias.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
