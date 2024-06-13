export function Blog() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-12 lg:py-16">
            <article className="col-span-2 prose prose-gray max-w-none dark:prose-invert">
                <div className="space-y-2 not-prose">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        The Rise of Artificial Intelligence: Opportunities and Challenges
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Published on June 1, 2023</p>
                </div>
                <p>
                    Artificial Intelligence (AI) has been a topic of fascination and debate for decades, and its impact on our
                    world is becoming increasingly evident. As technology continues to advance, the potential of AI to transform
                    various industries and aspects of our lives is undeniable.
                </p>
                <p>
                    One of the most significant opportunities presented by AI is its ability to automate and streamline tasks,
                    leading to increased efficiency and productivity. From personalized recommendations to predictive analytics,
                    AI-powered systems can help businesses and individuals make more informed decisions and optimize their
                    operations.
                </p>
                <p>
                    However, with the rise of AI also come challenges that must be addressed. Concerns around job displacement,
                    algorithmic bias, and the ethical implications of AI-driven decision-making have rightfully been raised. As a
                    society, we must navigate these complexities and ensure that the development and deployment of AI technologies
                    are done in a responsible and transparent manner.
                </p>
                <p>
                    The future of AI is both exciting and daunting. It holds the potential to revolutionize various industries,
                    improve our quality of life, and push the boundaries of human knowledge and capabilities. At the same time, we
                    must remain vigilant and proactive in addressing the potential risks and unintended consequences of this
                    transformative technology.
                </p>
                <p>
                    As we continue to explore the frontiers of AI, it is crucial that we approach it with a balanced perspective,
                    weighing the benefits against the challenges. By fostering collaboration between policymakers, technologists,
                    and the public, we can work towards harnessing the power of AI in a way that benefits humanity as a whole.
                </p>
            </article>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Author</h2>
                    <div className="space-y-1">
                        <h3 className="text-xl font-medium">Jane Doe</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Jane Doe is a technology writer and AI enthusiast. She has been covering the latest advancements in
                            artificial intelligence for the past 5 years, exploring both the opportunities and challenges it presents.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}