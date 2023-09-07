import React, { createContext, useState } from "react";

type PageContextType = {
    page: PageObj;
    setPage: React.Dispatch<React.SetStateAction<PageObj>>;
}

export const PageContext = createContext<PageContextType | null>(null)

type PageContextProps = {
    children: React.ReactNode;
}

function PageContextProvider(props: PageContextProps) {
    const [page, setPage] = useState<PageObj>({currentPage: "Home"})
    return (
        <PageContext.Provider value={{page, setPage}}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextProvider;