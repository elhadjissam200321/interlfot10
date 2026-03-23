import parse, { HTMLReactParserOptions, Element } from 'html-react-parser'
import React from 'react'
import { cn } from '@/lib/utils'

interface RichTextProps {
    content: string
    className?: string
}

export function RichText({ content, className }: RichTextProps) {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs) {
                // Optional: Intercept specific tags and replace them with Next.js or highly styled components
                // e.g., if (domNode.name === 'a') return <Link ... />
            }
        }
    }

    // If content is empty or null, return nothing
    if (!content) return null

    return (
        <div className={cn("font-sans leading-relaxed text-muted-foreground", className)}>
            {parse(content, options)}
        </div>
    )
}
