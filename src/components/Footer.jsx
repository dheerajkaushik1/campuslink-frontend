export default function Footer(){
    return (
        <footer className="bg-(--primary) md:h-[14vh] h-auto w-full flex flex-col md:flex-row py-5 gap-5 items-center md:justify-between md:px-10 border-t-2 border-(--border)">
            <h1 className="text-(--secondary) md:text-2xl cursor-pointer">
                © 2026 CampusLink. All rights reserved.
            </h1>
            <h2 className="text-(--text)">
                Made with ❤️ by Dheeraj Kaushik
            </h2>
        </footer>
    )
}