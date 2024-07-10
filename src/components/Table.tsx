
interface TableProps {
  columns: Array<{
    key: string,
    value: string
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<any>;
}

export function Table({ columns, rows }: TableProps) {  
  return (
    <div className="w-full relative overflow-x-auto rounded-md text-zinc-100">
      <table className="w-full text-sm text-left rtl:text-right rounded-xl">
        <thead className="text-xs uppercase bg-gray-900">
          <tr>
            {columns.map(col => <th key={col.key} scope="col" className="px-6 py-3">{col.value}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            rows.length ? rows.map((row, idx) => (
              <tr key={row?.id || idx} className="bg-gray-700 border-b border-gray-900">
                {columns.map(({ key }) => (
                  <td key={key} scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {row[key]}
                  </td>
                ))}
              </tr>
            )) : <tr className="bg-gray-700 border-b border-gray-900">
              <td colSpan={columns.length} scope="row" className="px-6 py-4 font-medium text-center whitespace-nowrap">
                Nenhum item encontrado
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}