export interface Project {
    id: string;
    name: string;
    category: "completed" | "ongoing" | "upcoming";
    type: "Residential" | "Commercial" | "Villa" | "Apartment" | "Plotted Development";
    location: string;
    image: string;
    gallery?: string[];
    description: string;
    features: string[];
    specifications: {
        area?: string;
        units?: string;
        floors?: string;
        amenities?: string[];
    };
    timeline: {
        startDate?: string;
        completionDate?: string;
        status: string;
    };
    priceRange?: string;
}

export const projects: Project[] = [
    // COMPLETED PROJECTS
    {
        id: "luxury-villas-ecr",
        name: "Luxury Villas - ECR",
        category: "completed",
        type: "Villa",
        location: "East Coast Road, Chennai",
        image: "/assets/Myans_Luxury_Villas_1.jpg",
        description: "Premium luxury villas with modern architecture and world-class amenities on the scenic East Coast Road.",
        features: [
            "CMDA Approved",
            "Gated Community",
            "24/7 Security",
            "Landscaped Gardens",
            "Club House",
            "Swimming Pool"
        ],
        specifications: {
            area: "2,500 - 3,500 sq.ft",
            units: "24 Villas",
            floors: "G+2",
            amenities: ["Gym", "Kids Play Area", "Jogging Track", "Party Hall"]
        },
        timeline: {
            startDate: "Jan 2022",
            completionDate: "Dec 2024",
            status: "100% Completed & Handed Over"
        },
        priceRange: "₹1.2 Cr - ₹2.5 Cr"
    },
    {
        id: "green-meadows-apartments",
        name: "Green Meadows Apartments",
        category: "completed",
        type: "Apartment",
        location: "T. Nagar, Chennai",
        image: "/assets/about-gallery1.png",
        description: "Modern residential apartments in the heart of T. Nagar with excellent connectivity and premium finishes.",
        features: [
            "DTCP Approved",
            "Prime Location",
            "Vastu Compliant",
            "Covered Parking",
            "Power Backup",
            "Lift Facility"
        ],
        specifications: {
            area: "1,200 - 2,000 sq.ft",
            units: "36 Apartments",
            floors: "G+6",
            amenities: ["Terrace Garden", "Rainwater Harvesting", "Solar Panels"]
        },
        timeline: {
            startDate: "Mar 2021",
            completionDate: "Sep 2023",
            status: "Fully Occupied"
        },
        priceRange: "₹75 Lakhs - ₹1.5 Cr"
    },
    {
        id: "commercial-plaza-omr",
        name: "Commercial Plaza - OMR",
        category: "completed",
        type: "Commercial",
        location: "Old Mahabalipuram Road, Chennai",
        image: "/assets/about-gallery2.png",
        description: "State-of-the-art commercial complex with premium office spaces and retail outlets on OMR.",
        features: [
            "CMDA Approved",
            "IT Park Proximity",
            "High-Speed Elevators",
            "Central AC",
            "Ample Parking",
            "Food Court"
        ],
        specifications: {
            area: "50,000 sq.ft",
            units: "48 Office Spaces",
            floors: "G+8",
            amenities: ["Conference Rooms", "Cafeteria", "ATM", "Security Systems"]
        },
        timeline: {
            startDate: "Jun 2020",
            completionDate: "Mar 2023",
            status: "90% Leased"
        }
    },

    // ONGOING PROJECTS
    {
        id: "skyline-towers",
        name: "Skyline Towers",
        category: "ongoing",
        type: "Apartment",
        location: "Velachery, Chennai",
        image: "/assets/about-gallery3.png",
        description: "Premium high-rise apartments with panoramic city views and luxury amenities in Velachery.",
        features: [
            "CMDA Approved",
            "Smart Home Features",
            "Earthquake Resistant",
            "Rainwater Harvesting",
            "Solar Power",
            "EV Charging Stations"
        ],
        specifications: {
            area: "1,400 - 2,800 sq.ft",
            units: "120 Apartments",
            floors: "G+18",
            amenities: ["Infinity Pool", "Gym", "Yoga Deck", "Indoor Games", "Mini Theatre"]
        },
        timeline: {
            startDate: "Jan 2024",
            completionDate: "Dec 2026",
            status: "40% Completed - Foundation & Structure Done"
        },
        priceRange: "₹85 Lakhs - ₹2 Cr"
    },
    {
        id: "heritage-villas-mahabalipuram",
        name: "Heritage Villas",
        category: "ongoing",
        type: "Villa",
        location: "Mahabalipuram, Chennai",
        image: "/assets/featured-grid1.jpg",
        description: "Exclusive beach-facing villas with traditional architecture blended with modern comforts near Mahabalipuram.",
        features: [
            "DTCP Approved",
            "Beach Access",
            "Traditional Design",
            "Private Gardens",
            "Servant Quarters",
            "Gated Community"
        ],
        specifications: {
            area: "3,000 - 4,500 sq.ft",
            units: "18 Villas",
            floors: "G+1",
            amenities: ["Beach Club", "Spa", "Restaurant", "Kids Pool"]
        },
        timeline: {
            startDate: "Aug 2024",
            completionDate: "Aug 2026",
            status: "25% Completed - Site Development in Progress"
        },
        priceRange: "₹2.5 Cr - ₹4 Cr"
    },
    {
        id: "tech-park-siruseri",
        name: "Tech Park - Siruseri",
        category: "ongoing",
        type: "Commercial",
        location: "Siruseri IT Corridor, Chennai",
        image: "/assets/villa.webp",
        description: "Modern IT park with Grade-A office spaces designed for tech companies and startups.",
        features: [
            "CMDA Approved",
            "Green Building Certified",
            "High-Speed Internet",
            "24/7 Operations",
            "Multi-Level Parking",
            "Cafeteria & Food Court"
        ],
        specifications: {
            area: "1,50,000 sq.ft",
            units: "200+ Workspaces",
            floors: "G+12",
            amenities: ["Auditorium", "Gym", "Creche", "Medical Room", "ATMs"]
        },
        timeline: {
            startDate: "Oct 2023",
            completionDate: "Jun 2026",
            status: "60% Completed - Interiors in Progress"
        }
    },

    // UPCOMING PROJECTS
    {
        id: "smart-city-plots",
        name: "Smart City Plots - Phase 2",
        category: "upcoming",
        type: "Plotted Development",
        location: "Sriperumbudur, Chennai",
        image: "/assets/about-gallery1.png",
        description: "DTCP approved residential plots with complete infrastructure in the upcoming smart city corridor.",
        features: [
            "DTCP Approved",
            "Underground Drainage",
            "Street Lights",
            "Tar Roads",
            "Water Connection",
            "Electricity"
        ],
        specifications: {
            area: "600 - 2,400 sq.ft plots",
            units: "150 Plots",
            amenities: ["Park", "Community Hall", "Temple", "Shopping Complex"]
        },
        timeline: {
            startDate: "Apr 2026",
            completionDate: "Dec 2027",
            status: "Approvals in Progress - Launch Soon"
        },
        priceRange: "₹18 Lakhs - ₹72 Lakhs"
    },
    {
        id: "riverside-residency",
        name: "Riverside Residency",
        category: "upcoming",
        type: "Apartment",
        location: "Adyar, Chennai",
        image: "/assets/about-gallery2.png",
        description: "Ultra-luxury apartments overlooking the Adyar river with world-class amenities and finishes.",
        features: [
            "CMDA Approved",
            "River View",
            "Italian Marble Flooring",
            "Modular Kitchen",
            "Premium Fixtures",
            "Home Automation"
        ],
        specifications: {
            area: "2,000 - 4,000 sq.ft",
            units: "60 Apartments",
            floors: "G+15",
            amenities: ["Rooftop Pool", "Sky Lounge", "Concierge", "Valet Parking", "Pet Park"]
        },
        timeline: {
            startDate: "Jul 2026",
            completionDate: "Dec 2028",
            status: "Planning Stage - Pre-Launch Bookings Open"
        },
        priceRange: "₹1.8 Cr - ₹4.5 Cr"
    },
    {
        id: "eco-farmlands",
        name: "Eco Farmlands",
        category: "upcoming",
        type: "Plotted Development",
        location: "Kanchipuram District",
        image: "/assets/about-gallery3.png",
        description: "Agricultural land parcels with organic farming support and weekend farmhouse development options.",
        features: [
            "Clear Title",
            "Bore Well",
            "Fencing",
            "Farm Road Access",
            "Organic Farming Support",
            "Mango & Coconut Plantation"
        ],
        specifications: {
            area: "1 - 5 Acres",
            units: "40 Parcels",
            amenities: ["Farm House Option", "Drip Irrigation", "Storage Shed"]
        },
        timeline: {
            startDate: "Sep 2026",
            completionDate: "Mar 2027",
            status: "Land Acquisition in Progress"
        },
        priceRange: "₹25 Lakhs - ₹1.2 Cr per Acre"
    }
];
