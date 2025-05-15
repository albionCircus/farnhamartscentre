"use client"
import React, { useState } from 'react';

export function NewsletterForm() {

    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        // Type assertion for the target to ensure TypeScript understands the form elements
        const form = e.currentTarget;
        
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "57de5845-a34e-4f64-aa7b-776d7985913a",
                email: (form.elements.namedItem('email') as HTMLInputElement).value,
            }),
        });
        
        const result = await response.json();
        if (result.success) {
            setSubmitted(true);
        } else {
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <>
            {submitted ? (
                <p className="block mt-2.5">
                    <strong>Thanks for signing up!</strong>
                </p>
            ) : (
            <form onSubmit={handleSubmit} className="pt-4">
                <input type="hidden" name="subject" value="Newsletter sign up submission" aria-hidden="true" />
                <input type="checkbox" name="botcheck" className="honeyPot" autoComplete="off" aria-hidden="true" />
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-sm mb-1">Email*</label>
                    <input type="email" name="email" required placeholder="email@example.com" aria-label="Enter your email address" className="bg-white rounded w-full max-w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" aria-label="submit" className="bg-realTeal hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
            )}
        </>
    );
}

export default NewsletterForm;