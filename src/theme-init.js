try { const theme=localStorage.getItem('evans-jep-appearance-v2'); document.documentElement.dataset.theme=theme==='light'?'light':'dark'; } catch { document.documentElement.dataset.theme='dark'; }
