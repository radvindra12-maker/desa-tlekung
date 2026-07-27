import AddressForm from "@/components/purchase/forms/AddressForm";

export default function TestAddressPage() {
  return (
    <main className="mx-auto max-w-xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">
        Alamat Pengiriman
      </h1>

      <AddressForm />
    </main>
  );
}