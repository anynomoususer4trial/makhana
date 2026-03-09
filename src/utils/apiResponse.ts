import { NextResponse } from "next/server";

export function apiSuccess(data: any, message = "Success", status = 200) {

  return NextResponse.json(
    {
      success: true,
      message,
      data
    },
    {
      status
    }
  );

}

export function apiError(message = "Something went wrong", status = 500) {

  return NextResponse.json(
    {
      success: false,
      message
    },
    {
      status
    }
  );

}