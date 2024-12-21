export const copyToClipboard = async (text: string) => {
  if (navigator?.clipboard) {
    try {
      await navigator?.clipboard?.writeText(text);
      console.log("Texto copiado para a área de transferência");
    } catch (err) {
      console.error("Falha ao copiar o texto: ", err);
    }
  } else {
    console.error("Clipboard API não disponível");
  }
};
