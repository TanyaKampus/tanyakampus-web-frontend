import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { getCampusByIdService } from "@/services/campus.service";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = useMemo(
    () => location.pathname.split("/").filter((x) => x),
    [location.pathname]
  );

  const { id } = useParams<{ id: string }>();

  const [campusName, setCampusName] = useState<string>("");
  const [loadingName, setLoadingName] = useState(false);

  useEffect(() => {
    // cuma fetch kalau memang ada param id (detail kampus)
    if (!id) return;

    const fetchName = async () => {
      try {
        setLoadingName(true);
        const res = await getCampusByIdService(id);
        setCampusName(res?.data?.nama_kampus || "");
      } catch {
        setCampusName("");
      } finally {
        setLoadingName(false);
      }
    };

    fetchName();
  }, [id]);

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
          id && value === id
            ? loadingName
              ? "Loading..."
              : campusName || value
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
