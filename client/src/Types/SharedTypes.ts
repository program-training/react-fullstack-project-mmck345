type PageOption = "Home" | "Trips" | "TripDetail" | "NewTripForm" | "UpdateTripForm" | "UserRegistration" | "UserLogin";

type PageObj = {
    currentPage: PageOption,
    arg?: {
        currentTripId: string
        [key: string]: string
    }
}