import React from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	align?: "left" | "center";
	className?: string;
	titleClassName?: string;
	subtitleClassName?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	subtitle,
	align = "center",
	className,
	titleClassName,
	subtitleClassName,
}) => {
	return (
		<div
			className={cn(
				"mb-12",
				align === "center" ? "text-center" : "text-left",
				className
			)}
		>
			<h2
				className={cn(
					"font-display text-4xl md:text-5xl font-bold text-foreground",
					titleClassName
				)}
			>
				{title}
			</h2>
			{subtitle ? (
				<p
					className={cn(
						"text-lg text-muted-foreground mt-2",
						subtitleClassName
					)}
				>
					{subtitle}
				</p>
			) : null}
		</div>
	);
};

export default SectionHeader;


