import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function payerDisplay() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Payer ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">P001</TableCell>
          <TableCell>HealthFirst Insurance</TableCell>
          <TableCell>Providing comprehensive healthcare coverage for families and individuals.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">P002</TableCell>
          <TableCell>MediCare Plus</TableCell>
          <TableCell>Specializing in senior care and offering additional benefits for Medicare recipients.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">P003</TableCell>
          <TableCell>WellCare Network</TableCell>
          <TableCell>Focused on wellness programs and preventive care services for members.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">P004</TableCell>
          <TableCell>LifeGuard Health</TableCell>
          <TableCell>Emphasizing emergency care and life-saving treatments in their network of hospitals.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">P005</TableCell>
          <TableCell>SecureCare Solutions</TableCell>
          <TableCell>Offering secure and reliable healthcare management services for providers and patients.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
