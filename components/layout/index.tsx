import styles from "./layout.module.css";
import { BoldLargeText, TinyLargeText, MediumLargeText } from "ui/text";
import { LogInButton } from "ui/button";
import Link from "next/link";
import {
  TiShoppingCart,
  VscMenu,
  AiFillLinkedin,
  TiSocialInstagram,
} from "ui/icons";
import { useEffect, useState } from "react";
import { SearchPageSearchForm } from "components/searchForms";
import { useRouter } from "next/router";
import { getStoragedUser, LogOut } from "lib";
import { TypeUserData } from "custom";

export function Layout({ children }: any) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({} as TypeUserData);
  useEffect(() => {
    const userData = getStoragedUser();
    setUser(userData);
  }, []);

  function removeUserCredentials() {
    LogOut();
    setUser({ email: "", fullname: "" });
    router.push("/");
  }
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.header_cart__container}>
          <TiShoppingCart color="white" size="20" />
          <div onClick={() => router.push("/")}>
            <MediumLargeText cursor="on" text="MaxBuy!" color="white" />
          </div>
        </div>
        <div className={styles.header_menu__container}>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <VscMenu color="white" size="40" />
          </div>

          <div
            className={styles.container}
            style={{ display: isActive ? "block" : "none" }}
          >
            <div className={styles.window}>
              <Link href="/sign-in" passHref>
                <a className={styles.window_link}>Ingresar</a>
              </Link>
              <Link href="/profile" passHref>
                <a className={styles.window_link}>Mi Perfil</a>
              </Link>
              <Link href="/search" passHref>
                <a className={styles.window_link}>Buscar</a>
              </Link>
              <Link href={router.pathname}>
                <a
                  className={styles.window_link}
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                >
                  Volver
                </a>
              </Link>
              <div className={styles.bottom_text_logout}>
                <TinyLargeText text={user?.email} color="white" />
                <div onClick={removeUserCredentials}>
                  <TinyLargeText
                    cursor="on"
                    text={user.email ? "cerrar sesión" : ""}
                    color="var(--pink)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.header_menu_highResolution}>
          {user?.email ? (
            <div className={styles.header_menu__logged}>
              <TinyLargeText
                className={styles.logged_email}
                text={user?.email}
              />
              <div
                onClick={() => {
                  LogOut();
                  setUser({ email: "", fullname: "" });
                }}
              >
                <TinyLargeText
                  className={styles.logged_logout}
                  text="cerrar sesión"
                  cursor="on"
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              <LogInButton
                className={styles.header_menu__button}
                text="Ingresar"
              />
            </div>
          )}
        </div>
      </header>
      <div>
        <SearchPageSearchForm />
      </div>
      <div>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.media_nav_container}>
          <nav className={styles.page_navbar}>
            <ul className={styles.page_links}>
              <li className={styles.page_item}>
                <Link href="/sign-in" passHref>
                  <a className={styles.page_link}>Ingresar</a>
                </Link>
              </li>
              <li className={styles.page_item}>
                <Link href="/profile" passHref>
                  <a className={styles.page_link}>Mi Perfil</a>
                </Link>
              </li>
              <li className={styles.page_item}>
                <Link href="/search" passHref>
                  <a className={styles.page_link}>Buscar</a>
                </Link>
              </li>
              <li className={styles.page_item}>
                <p
                  onClick={removeUserCredentials}
                  style={{ fontSize: 15, margin: 0, cursor: "pointer" }}
                >
                  Logout
                </p>
              </li>
            </ul>
          </nav>

          <nav className={styles.social_media}>
            <BoldLargeText
              text="Redes"
              className={styles.social_media__title}
              color="white"
            />
            <div className={styles.social_media_link__container}>
              <AiFillLinkedin
                size="20"
                color="white"
                className={styles.tweeter_icon}
              />
              <Link
                href="https://www.linkedin.com/in/maximo-rossini-410225214"
                passHref
              >
                <a className={styles.social_media__link}>LinkedIn</a>
              </Link>
            </div>
            <div className={styles.social_media_link__container}>
              <TiSocialInstagram
                size="20"
                color="white"
                className={styles.tweeter_icon}
              />
              <Link
                href="https://www.instagram.com/maximor0ssini/?hl=es"
                passHref
              >
                <a className={styles.social_media__link}>Instagram</a>
              </Link>
            </div>
          </nav>
        </div>
        <div className={styles.footer_copyright}>
          <TinyLargeText text="©2022 apx" color="white" />
        </div>
      </footer>
    </div>
  );
}
