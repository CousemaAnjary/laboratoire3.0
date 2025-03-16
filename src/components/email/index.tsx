import * as React from 'react';
import { CodeXml } from 'lucide-react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'


interface labVerifyEmailProps {
    verificationCode?: string
}



export default function LabVerifyEmail({ verificationCode }: labVerifyEmailProps) {


    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Vérification de votre adresse e-mail - Laboratoire</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <CodeXml width={75} height={45} color='#ffffff' />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Vérifiez votre adresse e-mail</Heading>
                            <Text style={mainText}>
                                Merci d&apos;avoir commencé le processus de création de votre compte Laboratoire.
                                Nous voulons nous assurer qu&apos;il s&apos;agit bien de vous.
                                Veuillez entrer le code de vérification suivant lorsqu&apos;il vous sera demandé.
                                Si vous ne souhaitez pas créer de compte, vous pouvez ignorer ce message.
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>Code de vérification</Text>

                                <Text style={codeText}>{verificationCode}</Text>
                                <Text style={validityText}>
                                    (Ce code est valide pendant 10 minutes)
                                </Text>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                Laboratoire ne vous demandera jamais de divulguer ou de vérifier votre mot de passe,
                                votre carte bancaire ou vos informations bancaires.
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#fff',
    color: '#212121',
};

const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
};

const h1 = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
};



const text = {
    color: '#333',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
};

const imageSection = {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
};

const codeText = {
    ...text,
    fontWeight: 'bold',
    fontSize: '36px',
    color: '#0620db',
    margin: '10px 0',
    textAlign: 'center' as const,
};

const validityText = {
    ...text,
    margin: '0px',
    textAlign: 'center' as const,
};

const verificationSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };
