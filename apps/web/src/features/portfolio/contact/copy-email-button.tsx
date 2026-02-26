import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
	const [copied, setCopied] = useState(false);

	function handleCopy(e: React.MouseEvent) {
		e.preventDefault();
		navigator.clipboard.writeText(email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}

	return (
		<button
			onClick={handleCopy}
			className="contact-copy-btn"
			aria-label="Copy email address"
			title={copied ? "Copied!" : "Copy email"}
		>
			{copied ? <Check size={13} /> : <Copy size={13} />}
		</button>
	);
}
