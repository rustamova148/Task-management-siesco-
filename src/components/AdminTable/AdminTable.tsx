import styles from "./AdminTable.module.css" 

interface Column<T> {
  header: string;
  renderCell: (item: T) => React.ReactNode;
  key: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (item: T) => React.Key;
}

const AdminTable = <T,>({ data, columns, rowKey }: AdminTableProps<T>) => {
  return (
    <table className={styles.admin_table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={rowKey(item)}>
            {columns.map((col) => (
              <td key={col.key}>{col.renderCell(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
