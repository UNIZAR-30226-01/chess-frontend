import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const handleGoogle = async () => {
    let timer = null;
    const popup = window.open('http://localhost:4000/api/v1/sign-in/google', 'popup', 'width=600,height=600');
    if (popup) {
      timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          router.push('/home');
        }
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://reign-chess.duckdns.org:4000/api/v1/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.elements?.email?.value,
        username: e.target.elements?.username?.value,
        password: e.target.elements?.password?.value,
      }),
    })
        .then((res) => {
          if (res.ok) router.push('/home');
          throw new Error('Network response was not ok.');
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
  };

  return (
    <div className="flex min-h-screen flex-col justify-around sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-fit h-fit mx-auto py-4">
          <img src="/vercel_dark.svg" className="w-24 h-16 mx-auto" />
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="POST">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-700">
            Crea tu cuenta
            </h2>
            <p className='text-sm text-center'>
            Tenga en cuenta que para registrarse es necesario verificar su dirección de correo electrónico. Su correo electrónico se utilizará para verificar su identidad por motivos de seguridad.
            </p>
            <div>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Nombre de usuario"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="Contraseña"
                  required
                  className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-4 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="capitalize flex w-full justify-center rounded-sm border border-transparent bg-emerald/80 hover:bg-emerald/90 duration-300 py-4 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                  continuar
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm font-base tracking-wide">
                ¿Ya tienes cuenta?
                <Link href="/auth/signin" className="ml-1 text-emerald">
                 Entrar
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">O</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">
              <button
                type="submit"
                data-provider="google"
                onClick={handleGoogle}
                className="flex w-full justify-start items-center gap-x-3 rounded-sm border py-4 px-5 text-sm font-medium text-gray-800 shadow-sm focus:outline-none"
              >
                <FcGoogle className='w-6 h-6'/>
                <span>Continuar con Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div/>
    </div>
  );
}
