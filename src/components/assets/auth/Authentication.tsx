import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import spin from "../../../public/loading/Spin.svg";
import useAuth from "../../data/hook/useAuth";

export default function Authentication(props) {
  const { user, loading } = useAuth();

  function renderContent() {
    return (
      <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if(!document.cookie?.includes("admin-sintonizat")) {
              window.location.href = "/authentication"
            }
            `
          }}
        />
      </Head>
        {props.children}
      </>
    )
  }

  function renderLoading() {
    return (
      <div
        className={`
            flex justify-center items-center h-screen
        `}
      >
        <Image src={spin} alt="loadin" />
      </div>
    );
  }

  if (!loading && user?.email) {
    return renderContent()
  } else if (loading) {
    return renderContent()
  } else {
    router.push("/authentication")
    return null;
  }
}
