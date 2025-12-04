import { useState } from 'react';
import { Plus, Send, X } from 'lucide-react';
import { usePublicHymns } from '../hooks/usePublicHymns';

interface PublicHymnSubmissionProps {
  onClose?: () => void;
}

export default function PublicHymnSubmission({ onClose }: PublicHymnSubmissionProps) {
  const [hymnName, setHymnName] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addPublicHymn } = usePublicHymns();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hymnName.trim()) {
      setError('Nome do hino é obrigatório');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addPublicHymn(hymnName, submitterName);

      setShowSuccess(true);
      setHymnName('');
      setSubmitterName('');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar hino');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setHymnName('');
    setSubmitterName('');
    setError(null);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-green-800">
              Hino enviado com sucesso!
            </p>
            <p className="text-base text-green-700">
              Seu hino foi adicionado ao hinário A e já está disponível para uso.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Plus className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-base font-semibold text-blue-800">
            Adicionar Novo Hino (Hinário A)
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-blue-400 hover:text-blue-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-base font-medium text-blue-800 mb-1">
            Nome do Hino *
          </label>
          <input
            type="text"
            value={hymnName}
            onChange={(e) => setHymnName(e.target.value.toUpperCase())}
            placeholder="DIGITE O NOME DO HINO EM MAIÚSCULAS"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base uppercase"
            maxLength={200}
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-blue-800 mb-1">
            Seu Nome (opcional)
          </label>
          <input
            type="text"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            placeholder="Digite seu nome (opcional)"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            maxLength={100}
          />
        </div>

        {error && (
          <div className="text-base text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !hymnName.trim()}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Hino
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors text-base"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="mt-3 text-sm text-blue-600">
        <p>
          💡 Os hinos adicionados recebem automaticamente numeração com prefixo "A" (ex: A1, A2, etc.)
        </p>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Plus, Send, X } from 'lucide-react';
import { usePublicHymns } from '../hooks/usePublicHymns';

interface PublicHymnSubmissionProps {
  onClose?: () => void;
}

export default function PublicHymnSubmission({ onClose }: PublicHymnSubmissionProps) {
  const [hymnName, setHymnName] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addPublicHymn } = usePublicHymns();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hymnName.trim()) {
      setError('Nome do hino é obrigatório');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addPublicHymn(hymnName, submitterName);

      setShowSuccess(true);
      setHymnName('');
      setSubmitterName('');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar hino');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setHymnName('');
    setSubmitterName('');
    setError(null);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-green-800">
              Hino enviado com sucesso!
            </p>
            <p className="text-base text-green-700">
              Seu hino foi adicionado ao hinário A e já está disponível para uso.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Plus className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-base font-semibold text-blue-800">
            Adicionar Novo Hino (Hinário A)
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-blue-400 hover:text-blue-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-base font-medium text-blue-800 mb-1">
            Nome do Hino *
          </label>
          <input
            type="text"
            value={hymnName}
            onChange={(e) => setHymnName(e.target.value.toUpperCase())}
            placeholder="DIGITE O NOME DO HINO EM MAIÚSCULAS"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base uppercase"
            maxLength={200}
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium text-blue-800 mb-1">
            Seu Nome (opcional)
          </label>
          <input
            type="text"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            placeholder="Digite seu nome (opcional)"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            maxLength={100}
          />
        </div>

        {error && (
          <div className="text-base text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !hymnName.trim()}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Hino
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors text-base"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="mt-3 text-sm text-blue-600">
        <p>
          💡 Os hinos adicionados recebem automaticamente numeração com prefixo "A" (ex: A1, A2, etc.)
        </p>
      </div>
    </div>
  );
}
