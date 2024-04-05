
type ChipProps = {
  status: 'PENDING' | 'FILLED' | 'REJECTED' | undefined
}
export const Chip = (status: ChipProps) => {
  return (
    <div className={`chip-container chip-${status.status?.toLocaleLowerCase()}`}>
      {status.status}
    </div>
  )
}
