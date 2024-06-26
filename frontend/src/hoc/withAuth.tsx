import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Loader from "../components/loader";

export default function withAuth(WrappedComponent: any) {
  //новый компонент AuthComponent
  function AuthComponent(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token"); //получаем токен из localStorage

      //если токена нет, то перенаправляем на страницу логина
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const decoded: any = jwtDecode(token); //декодируем токен
        const currentTime = Date.now() / 1000; //текущее время

        //если срок действия токена истек, то удаляем токен из localStorage и перенаправляем на страницу логина
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          router.push("/");
        }

        // при успешной проверки, загружаем страницу
        setIsLoading(false);
      } catch (err) {
        console.error("Invalid token", err); //логируем ошибку если токен недействителен
        localStorage.removeItem("token");
        router.push("/");
      }
    }, [router]);

    //отображаем индикатор загрузки пока не принято решение
    if (isLoading) {
      return <Loader />;
    }

    //рендерим оборачиваемый компонент и передаем ему пропсы
    return <WrappedComponent {...props} />;
  }

  //displayName для AuthComponent
  AuthComponent.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return AuthComponent;
}

//вспомогательная функция для получения displayName компонента
function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
