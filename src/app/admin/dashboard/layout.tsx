import { AuthGuard } from "@/components/admin/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard
            requiredUser="wscadmin"
            requiredPass="wscadmin"
            storageKey="wsc_dashboard_auth"
            title="Dashboard"
        >
            {children}
        </AuthGuard>
    );
}
