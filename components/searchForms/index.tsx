import styles from "./searchform.module.css";
import { TextField } from "ui/textfield";
import { HomeButton, SearchButton } from "ui/button";
import { useRouter } from "next/router";

type SearchFormType = {
  onSearch: (query: string) => {};
};

export function HomePageSearchForm() {
  const router = useRouter();
  function handleSubmit(e: any) {
    e.preventDefault();
    const query = e.target.search.value;
    if (query != " ") {
      router.push("/search?q=" + query + "&limit=3&offset=1");
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.home_form}>
      <TextField
        type="search"
        placeholder="Encontra tu producto ideal"
        name="search"
      />
      <div className={styles.home_button__container}>
        <HomeButton text="Buscar" />
      </div>
    </form>
  );
}

export function SearchPageSearchForm() {
  const router = useRouter();
  function handleSubmit(e: any) {
    e.preventDefault();
    const query = e.target.search.value;
    if (query != "") {
      router.push("/search?q=" + query + "&limit=3&offset=1");
    }
  }

  return router.pathname.includes("/search") ? (
    <form onSubmit={handleSubmit} className={styles.search_form}>
      <TextField type="search" placeholder="Chair.." name="search" />
      <div className={styles.search_button__container}>
        <SearchButton text="Buscar" color="black" />
      </div>
    </form>
  ) : (
    <div></div>
  );
}
