export function ThemeScript() {
  const script = `
    (function() {
      const STORAGE_KEY = 'origin-labs-theme';

      function getInitialTheme() {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored === 'dark' || stored === 'light') return stored;
        } catch (e) {}

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      const theme = getInitialTheme();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
