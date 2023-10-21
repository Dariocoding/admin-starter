import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router";
import { PortalLoader, hideLoader } from "./components/ui/Loader";
import RenderIf from "@/components/ui/RenderIf";
import { configEnterpriseService, configAppService } from "@teslo/services";
import { useAuthStore, useConfigApp, useModalStore } from "./store";
import { DefaultToastOptions, Toaster } from "react-hot-toast";
import { useConfigEnterpriseStore } from "./store";
import { IntlProvider } from "react-intl";
import { useI18Store } from "./store/i18Store";
import { ValidLocales, i18nTranslate } from "./i18n";

const Modal = React.lazy(() => import("@/components/ui/Modal"));

interface IAppProps {}

const defaultToastOptions: DefaultToastOptions = {
  position: "bottom-right",
  style: {
    borderRadius: "10px",
    background: "#079992",
    color: "#fff",
  },
  error: {
    style: {
      background: "#ff0000",
      color: "#fff",
    },
  },
  duration: 3000,
};

const App: React.FunctionComponent<IAppProps> = (props) => {
  const {} = props;
  const [messages, setMessage] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { setColors } = useConfigApp();
  const { locale } = useI18Store();
  const { setConfigEnterprise } = useConfigEnterpriseStore();
  const initAuthenticate = useAuthStore((state) => state.initAuthenticate);
  const { size, title, show, closeModal, content } = useModalStore();

  React.useEffect(() => {
    const init = async () => {
      try {
        const [_, configApp, configEnterprise] = await Promise.all([
          initAuthenticate(),
          configAppService.find(["colors"]),
          configEnterpriseService.find(),
        ]);

        setColors(configApp.data.colorsAdmin);
        setConfigEnterprise(configEnterprise.data);

        await initAuthenticate();
      } catch (error) {
      } finally {
        hideLoader();
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    i18nTranslate[locale]().then((messagesTranslate) => {
      const translation = Object.keys(messagesTranslate);
      setMessage(messagesTranslate[translation[0]]);
    });
  }, [locale]);

  return (
    <React.Fragment>
      {!loading && (
        <>
          <IntlProvider
            textComponent={React.Fragment}
            locale={locale}
            messages={messages}
            defaultLocale={ValidLocales.ENGLISH.locale}
          >
            <Toaster toastOptions={defaultToastOptions} />
            <BrowserRouter>
              <React.Suspense fallback={<></>}>
                <RenderIf isTrue={show}>
                  <Modal onClose={closeModal} showModal={show} title={title} size={size}>
                    {content}
                  </Modal>
                </RenderIf>
              </React.Suspense>
              <AppRouter />
            </BrowserRouter>
          </IntlProvider>
        </>
      )}
      <PortalLoader />
    </React.Fragment>
  );
};

export default App;
