import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';



export async function POST(request: NextRequest) {
  await connect()

  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      savedUser,
      success: true,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}