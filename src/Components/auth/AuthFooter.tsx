import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TAuthFooterProps {
  buttonText: string;
  linkText: string;
  linkTo: string;
  loading: boolean;
}

const AuthFooter = ({ buttonText, linkText, linkTo, loading }: TAuthFooterProps) => {
  return (
    <div className="space-y-4">
      <Button type="submit" className="w-full" disabled={loading} variant="default">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            로딩중...
          </>
        ) : (
          buttonText
        )}
      </Button>

      <div className="mb-8 flex justify-end">
        <Link
          to={linkTo}
          className="mb-8 text-muted-foreground transition-colors hover:text-primary"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthFooter;
