import { NextPage } from "next";
import Link from "next/link";
import Layout from "./layout";

const NotFound: NextPage = () => (
  <Layout>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Page not found</h1>
          <p className="py-6">
            The page you are trying to acces does&quot;t exist.
          </p>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFound;
