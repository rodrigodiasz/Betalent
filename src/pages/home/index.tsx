import React, { useState, useEffect } from "react";
import search from "../../assets/search.svg";
import logo from "../../assets/logo.svg";

interface Dataprops {
  id: string;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

export function Home() {
  const [employees, setEmployees] = useState<Dataprops[]>([]);
  const [input, setInput] = useState("");
  const [openEmployeeId, setOpenEmployeeId] = useState<string | null>(null);

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = input.toLowerCase();
    const admissionDate = new Date(employee.admission_date)
      .toLocaleDateString()
      .toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.job.toLowerCase().includes(searchTerm) ||
      employee.phone.includes(searchTerm) ||
      admissionDate.includes(searchTerm)
    );
  });

  function toggleEmployee(id: string) {
    setOpenEmployeeId(openEmployeeId === id ? null : id);
  }

  function formatPhone(phone: string) {
    const numericPhone = phone.replace(/\D/g, "");
    if (numericPhone.startsWith("55")) {
      return numericPhone.replace(
        /(\d{2})(\d{2})(\d{5})(\d{4})/,
        "+$1 ($2) $3-$4"
      );
    }
    return phone;
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Buscando por:", input);
  }

  return (
    <div>
      <header className="w-full bg-white p-6 shadow-xl">
        <div className="container mx-auto">
          <img className="w-30" src={logo} alt="Logo" />
        </div>
      </header>

      <main className="container mx-auto  h-screen">
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-6">
          <h1 className="font-semibold text-2xl self-start md:self-center mb-4 md:mb-0">
            Funcionários
          </h1>
          <form
            className="relative flex w-full md:w-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow md:flex-grow-0 bg-white border-2 border-gray-10 flex rounded p-2">
              <input
                className="flex-grow bg-transparent focus:outline-none"
                type="text"
                placeholder="Pesquisar"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-transparent p-2 rounded cursor-pointer flex items-center justify-center"
              >
                <img src={search} alt="Search" />
              </button>
            </div>
          </form>
        </div>

        {/* Tabela Desktop */}
        <div className="hidden md:block mt-6">
          <table className="w-full leading-normal shadow-md overflow-hidden rounded">
            <thead className="text-white bg-blue-primary">
              <tr className="uppercase">
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Foto
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Nome
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Cargo
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Data de Admissão
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Telefone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-300">
                  <td className="px-5 py-2 text-sm text-black-01">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={employee.image}
                      alt={employee.name}
                    />
                  </td>
                  <td className="px-5 text-sm text-black-01">{employee.name}</td>
                  <td className="px-5 text-sm text-black-01">{employee.job}</td>
                  <td className="px-5 text-sm text-black-01">
                    {new Date(employee.admission_date).toLocaleDateString(
                      "pt-br"
                    )}
                  </td>
                  <td className="px-5 text-sm text-black-01">
                    {formatPhone(employee.phone)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabela Mobile */}
        <div className="block md:hidden mt-6">
          <table className="w-full leading-normal shadow-md overflow-hidden rounded">
            <thead className="bg-blue-primary text-white">
              <tr className="uppercase">
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Foto
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">
                  Nome
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold">●</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredEmployees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr
                    className={`border-gray-300 ${
                      openEmployeeId === employee.id ? "" : "border-b"
                    }`}
                  >
                    <td className="px-5 py-2 text-sm text-black-01">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={employee.image}
                        alt={employee.name}
                      />
                    </td>
                    <td className="px-5 py-2 text-sm text-black-01">
                      {employee.name}
                    </td>
                    <td className="px-5 py-2 text-sm text-black-01">
                      <button
                        onClick={() => toggleEmployee(employee.id)}
                        className="text-blue-primary"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            openEmployeeId === employee.id
                              ? "rotate-270"
                              : "rotate-90"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {/* Accordion */}
                  {openEmployeeId === employee.id && (
                    <tr className="border-b border-gray-300 bg-white">
                      <td colSpan={3} className="px-5 py-2 text-sm text-black-01">
                        <div className="mb-2">
                          <strong>Cargo:</strong> {employee.job}
                        </div>
                        <div className="mb-2">
                          <strong>Data de Admissão:</strong>{" "}
                          {new Date(employee.admission_date).toLocaleDateString(
                            "pt-br"
                          )}
                        </div>
                        <div>
                          <strong>Telefone:</strong>{" "}
                          {formatPhone(employee.phone)}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
