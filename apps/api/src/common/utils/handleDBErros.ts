import {
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';

export const handleDBErrors = (error: any) => {
  if (error?.detail) {
    throw new BadRequestException(error.detail);
  }

  if (
    error?.response?.message &&
    error.response?.statusCode &&
    error.response?.error
  ) {
    const response = error.response;
    console.log(error?.response);
    throw new HttpException(
      {
        status: response.statusCode,
        error: response.message || response.error,
      },
      response.statusCode,
    );
    // throw new HttpException({  });
  }

  console.log(error);
  throw new InternalServerErrorException('Please check server logs');
};
