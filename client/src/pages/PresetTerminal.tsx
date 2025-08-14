import { Clock } from 'lucide-react';

export default function PresetTerminal() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">PRESET TERMINAL</h1>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mt-2">
                Advanced strategy builder and preset management system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Clock className="h-20 w-20 text-gray-400 dark:text-gray-600 mb-6" />
            <h3 className="text-2xl font-mono text-gray-600 dark:text-gray-400 mb-4">
              PRESET TERMINAL COMING SOON
            </h3>
            <p className="text-gray-500 dark:text-gray-500 font-mono text-base max-w-md leading-relaxed">
              Advanced preset management, strategy sharing, and book weighting systems are currently in development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}