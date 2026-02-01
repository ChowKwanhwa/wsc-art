import { AuthGuard } from "@/components/admin/auth-guard";

export default function UploadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard
            requiredUser="wscjl"
            requiredPass="wscjl"
            storageKey="wsc_upload_auth"
            title="Employee Upload"
        >
            {children}
        </AuthGuard>
    );
}
