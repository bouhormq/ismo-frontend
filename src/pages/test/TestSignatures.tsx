import { useState } from "react";
import { restApiClient } from "$/utils/clients/restApiClient";

export default function TestSignatures() {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const sendTest = async (name: string) => {
    setLoading(name);
    setResult(null);
    try {
      await restApiClient
        .url("/playground/test-signature")
        .post({ userName: name });
      setResult(`✅ Email envoyé avec la signature de ${name} à bouhormq@gmail.com`);
    } catch (e) {
      setResult(`❌ Erreur: ${e instanceof Error ? e.message : "Erreur inconnue"}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10">
      <h1 className="text-2xl font-bold">Test Signatures Email</h1>
      <p className="text-gray-500">
        Envoie un email de test à <strong>bouhormq@gmail.com</strong>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => sendTest("Najib")}
          disabled={loading !== null}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading === "Najib" ? "Envoi..." : "Test Najib"}
        </button>
        <button
          onClick={() => sendTest("Dina")}
          disabled={loading !== null}
          className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading === "Dina" ? "Envoi..." : "Test Dina"}
        </button>
      </div>
      {result && (
        <p className="mt-4 rounded-lg bg-gray-100 px-6 py-3 text-center">
          {result}
        </p>
      )}
    </div>
  );
}
