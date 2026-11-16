export default function OutSpecTable() {
  return (
    <section className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4">
        Out Of Spec List
      </h3>

      <table className="w-full">
        <thead>
          <tr>
            <th>Line</th>
            <th>Parameter</th>
            <th>Machine</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>SMT1</td>
            <td>B_Zone1</td>
            <td>S1RF-A01</td>
            <td>165.5</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}