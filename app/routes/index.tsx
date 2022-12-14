import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "../assets/css/app.css";
import styles from "../assets/css/app.css";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const errorParam = url.searchParams.get("error");
  const successParam = url.searchParams.get("success");

  const data = {
    error: errorParam,
    success: successParam,
  };

  return json(data);
}

export default function Index() {
  const { error, success } = useLoaderData();

  return (
    <div className="container">
      <h1>Acorta tu Url</h1>
      <form method="post" action="/url">
        <input
          className="inputForms"
          type="text"
          name="original"
          id="original"
          placeholder="Coloca aqui la url"
        />
        <label>
          {error === "missing" && (
            <p className="error">Por favor, llena todos los campos</p>
          )}
          {error === "unavailable" && (
            <p className="error">Ese nombre ya esta en uso</p>
          )}
        </label>

        <input
          className="inputForms"
          type="text"
          name="short"
          id="short"
          placeholder="Coloca aqui la version corta, solo el nombre"
        />
        <button type="submit" className="inputForms">
          Acortar
        </button>
      </form>
      {success && (
        <p>
          Listo! tu URL acortada es! <a href={`/${success}`}>{` ${success}`}</a>
        </p>
      )}
    </div>
  );
}
