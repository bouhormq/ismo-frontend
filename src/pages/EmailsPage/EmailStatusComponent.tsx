type Props = {
  status: string;
};
const frenchEventNames: { [key: string]: string } = {
  sent: "Envoyé",
  delivered: "Livré",
  hard_bounce: "Rebond Dur",
  soft_bounce: "Rebond Mou",
  click: "Clic",
  open: "Ouverture",
  spam: "Pourriel",
  blocked: "Bloqué",
  invalid: "Invalide",
  unsubscribed: "Désabonné",
  deferred: "Différé",
  error: "Erreur",
  proxy_open: "Ouverture Proxy",
  invalid_email: "Email Invalide",
};
function EmailStatusComponent({ status }: Props) {
  return (
    <p className="text-center font-normal text-black tabletScreen:text-sm mobileScreen:text-xs">
      {frenchEventNames[status]}
    </p>
  );
}

export default EmailStatusComponent;
