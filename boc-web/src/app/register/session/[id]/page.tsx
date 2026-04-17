import RegisterForm from "./RegistrationForm";

export default async function RegisterPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;
    console.log("seesion ID: ",id);
    return (
        <div>
            <RegisterForm sessionId={id} />
        </div>
    );
}