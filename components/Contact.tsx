"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isSubmitting) return;

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const payload = {
			firstName: String(formData.get("firstName") || "").trim(),
			lastName: String(formData.get("lastName") || "").trim(),
			email: String(formData.get("email") || "").trim(),
			subject: String(formData.get("subject") || "").trim(),
			message: String(formData.get("message") || "").trim(),
		};

		if (
			!payload.firstName ||
			!payload.lastName ||
			!payload.email ||
			!payload.subject ||
			!payload.message
		) {
			toast({ title: "Please fill in all fields." });
			return;
		}

		try {
			setIsSubmitting(true);
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.error || "Failed to send message");
			}
			toast({
				title: "Message sent!",
				description: "I'll get back to you soon.",
			});
			form.reset();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong";
			toast({ title: "Could not send message", description: message });
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section id="contact" className="scroll-mt-24 py-16 px-4 bg-muted/30">
			<div className="container mx-auto max-w-4xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Get In Touch
					</h2>
					<p className="text-lg text-muted-foreground">
						I'm always interested in new opportunities and
						collaborations. Let's discuss your project!
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					{/* Contact Info */}
					<div>
						<h3 className="text-2xl font-semibold mb-6">
							Let's Connect
						</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Mail className="w-5 h-5 text-primary" />
								<span>antonioaren2@gmail.com</span>
							</div>
							<div className="flex items-center space-x-3">
								<Github className="w-5 h-5 text-primary" />
								<span>github.com/antonioaren</span>
							</div>
							<div className="flex items-center space-x-3">
								<Linkedin className="w-5 h-5 text-primary" />
								<span>linkedin.com/in/antonioaren</span>
							</div>
						</div>

						<div className="mt-8">
							<h4 className="text-lg font-semibold mb-4">
								Currently Available For
							</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Freelance opportunities</li>
								<li>• Tech Lead positions</li>
								<li>• Senior engineering roles</li>
								<li>• Architecture consulting</li>
							</ul>
						</div>
					</div>

					{/* Contact Form */}
					<Card>
						<CardHeader>
							<CardTitle>Send a Message</CardTitle>
							<CardDescription>
								Fill out the form below and I'll get back to you
								as soon as possible.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="firstName">
											First Name
										</Label>
										<Input
											id="firstName"
											placeholder="John"
											name="firstName"
										/>
									</div>
									<div>
										<Label htmlFor="lastName">
											Last Name
										</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											name="lastName"
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@example.com"
										name="email"
									/>
								</div>
								<div>
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										placeholder="Project Collaboration"
										name="subject"
									/>
								</div>
								<div>
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										placeholder="Tell me about your project or opportunity..."
										rows={4}
										name="message"
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting
										? "Sending..."
										: "Send Message"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
