import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AddPayer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit payer</CardTitle>
        <CardDescription>Add a new paying agency.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payer-id">Payer ID</Label>
            <Input id="payer-id" placeholder="Payer ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Description" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Submit</Button>
      </CardFooter>
    </Card>
  )
}
