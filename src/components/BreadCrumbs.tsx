import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { dataDetailKampus } from "@/data/dataDetailKampus";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { id } = useParams<{ id: string }>();
  const kampus = id ? dataDetailKampus.find((k) => k.id === id) : null;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ my: 2, color: "#CFCFCF" }}
    >
      <Link
        component={RouterLink}
        to="/"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <HomeIcon fontSize="medium" />
      </Link>

      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        const label =
          id && value === id && kampus
            ? kampus.nama.split(" (")[0] // ambil sebelum "("
            : value
                .split("-")
                .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
                .join(" ");

        return isLast ? (
          <Typography
            key={routeTo}
            color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            component={RouterLink}
            to={routeTo}
            underline="hover"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
