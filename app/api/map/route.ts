export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const address = searchParams.get("address");
        const api_key = process.env.MAP_API_KEY;

        if (!address) {
            return Response.json({ error: "Missing address" }, { status: 400 });
        }

        const coordinates = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${api_key}`, {
            method: "GET"
        })
        if (!coordinates){
            return Response.json({ error: "Failed to make request to geocode.maps.co" }, { status: 400 })
        }
        
        const data = await coordinates.json();
        return Response.json(data, { status: 200 });
    }
    catch (error: any) {
        return Response.json({ error: "Failed to get coordinates" }, { status: 400 })
    }
}