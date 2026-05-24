export default function TestPage() {
  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="bg-transparent p-6 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-6">IMS Brand Test</h1>
        <div className="space-y-3">
          <div className="bg-primary text-white p-4 rounded font-semibold">Primary: #79697B</div>
          <div className="bg-secondary text-white p-4 rounded font-semibold">Secondary: #2F2F33</div>
          <div className="bg-accent text-secondary p-4 rounded font-semibold">Accent: #FFBB00</div>
          <div className="bg-light text-secondary p-4 rounded border-2 border-secondary font-semibold">Light: #F5F6F7</div>
        </div>
      </div>
    </div>
  )
}