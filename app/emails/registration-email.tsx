import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface RegistrationEmailProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}

const baseUrl = process.env.BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export const RegistrationEmail = ({
  firstName,
  lastName,
  email,
  password,
  role,
}: RegistrationEmailProps) => {
  const previewText = `Registro do ${firstName} ${lastName} Ubisse na Am Power Trading`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`http://localhost:3000/vercel.svg`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Entrar como Administrador no Dashboard do Am Power Trading
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Olá {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Am Power Trading</strong> (
              <Link
                href={`mailto:joaquimubisse@gmail.com`}
                className="text-blue-600 no-underline"
              >
                geral@ampowertrading.co.mz
              </Link>
              ) acaba de o registrar como <strong>{role}</strong> em sua
              plataforma de vendas. Use as seguintes credenciais para fazer o
              LogIn:
            </Text>
            <code style={code}>Email: {email}</code>
            <code style={code}>Palavra-passe: {password}</code>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#171212] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`https://am-power-trading-admin.vercel.app/`}
              >
                Ir para o Dashboard
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              ou copia este URL para o seu navegador:{" "}
              <Link
                href={`https://am-power-trading-admin.vercel.app/`}
                className="text-blue-600 no-underline"
              >
                {`https://am-power-trading-admin.vercel.app/`}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text>
              Este convite foi destinado a{" "}
              <span className="text-black">{`${firstName} ${lastName}`}</span>.
              Este convite foi enviado por suporte@ampowertrading.co.mz
              localizado em{" "}
              <span className="text-black">Maputo - Moçambique</span>. Se você
              não esperava este convite, pode ignorar este e-mail. Se você está
              preocupado com a segurança de suas contas, responda a este e-mail
              para entrar em contato conosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};

export default RegistrationEmail;
