import Layout from '@/components/Layout';
import { useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url, {credentials: 'include'}).then((res) => res.json());

export default function Tournaments() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/tournaments?limit=10&page=${pageIndex}`, fetcher);

  return (
    <div className="py-12 max-w-5xl mx-auto px-0 sm:px-6 lg:px-8">
      <div className='flex items-center justify-between gap-x-4'>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-left text-gray-900 dark:text-white">Torneos</h1>
            <p className="mt-2 text-sm text-left text-gray-700 dark:text-gray-200">
            Listado de todos los torneos en curso.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-fit rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Crear torneo
        </button>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-1">
          <div className="inline-block min-w-full align-middle md:px-6 lg:px-8 ">
            <table className="min-w-full divide-y divide-gray-300 relative">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="select-none py-3.5 pl-4 pr-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white sm:pl-6 md:pl-0"
                  >
                    ID
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold capitalize text-gray-900 dark:text-white">
                    Estado
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Rondas
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    Jugadores
                  </th>
                  <th scope="col" className="select-none py-3.5 px-3 text-left text-sm font-semibold w-32 capitalize text-gray-900 dark:text-white">
                    <span aria-hidden='true' className='hidden'>Entrar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data.map((item) => (
                  <tr key={item.id}>
                    <td className="select-none whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      <span className='px-2 py-1 rounded-md bg-gray-100 font-medium'>
                        # {item.id}
                      </span>
                    </td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{item.rounds}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{item.rounds}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">{item.participants} / {Math.pow(2, item.rounds)}</td>
                    <td className="select-none whitespace-nowrap py-4 px-3 w-32 text-sm text-gray-500 dark:text-gray-200">
                      <Link href={`/tournaments/${item.id}`}>
                        view
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav className="max-w-5xl bg-white dark:bg-gray-800 pb-12 w-full flex items-center justify-between border-gray-200 border-t">
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={() => setPageIndex(pageIndex - 1)}
              className={`${data?.meta.nextPage === null && 'cursor-not-allowed'} inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700`}
              disabled={data?.meta.previousPage === null || pageIndex === 1}
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
              Previous
            </button>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              className={`${data?.meta.nextPage === null && 'cursor-not-allowed'} inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700`}
              disabled={data?.meta.nextPage === null || pageIndex === data?.meta.pages}
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400 dark:text-gray-200" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

Tournaments.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
}
