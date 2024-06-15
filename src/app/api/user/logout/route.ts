import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.set("token","",{
        httpOnly:true
    })
    return response
  } catch (error: any) {
    console.log("Logout is Unsuccessful");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
