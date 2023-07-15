export default function ElectionCard({
  id,
  title = 'Título do card',
  description = 'Descrição do card, que pode conter mais palavras que o título',
  showElectionCardTitle = true,
  onToggleElectionCard = null,
}) {
  function handleCardClick() {
    if (onToggleElectionCard) {
      onToggleElectionCard(id);
    }
  }

  const fontSizeClassName = showElectionCardTitle ? 'text-xl' : 'text-sm';

  return (
    <div
      className={`shadow-lg p-4 m-2 w-80 h-48 cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={handleCardClick}
    >
      {showElectionCardTitle ? title : description}
    </div>
  );
}
