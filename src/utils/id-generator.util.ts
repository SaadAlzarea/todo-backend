// import { nanoid } from 'nanoid';

// const newId = nanoid(10);

// export  newId;
import Snowflakify from "snowflakify";

const snowflakify = new Snowflakify({ preset: "ipv4" });

export function generatedId(): string {
    return snowflakify.nextHexId();
}
