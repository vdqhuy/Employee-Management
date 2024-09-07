USE [master]
GO
/****** Object:  Database [qlnv]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE DATABASE [qlnv]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'qlnv', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\qlnv.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'qlnv_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\qlnv_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [qlnv] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [qlnv].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [qlnv] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [qlnv] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [qlnv] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [qlnv] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [qlnv] SET ARITHABORT OFF 
GO
ALTER DATABASE [qlnv] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [qlnv] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [qlnv] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [qlnv] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [qlnv] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [qlnv] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [qlnv] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [qlnv] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [qlnv] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [qlnv] SET  DISABLE_BROKER 
GO
ALTER DATABASE [qlnv] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [qlnv] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [qlnv] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [qlnv] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [qlnv] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [qlnv] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [qlnv] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [qlnv] SET RECOVERY FULL 
GO
ALTER DATABASE [qlnv] SET  MULTI_USER 
GO
ALTER DATABASE [qlnv] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [qlnv] SET DB_CHAINING OFF 
GO
ALTER DATABASE [qlnv] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [qlnv] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [qlnv] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [qlnv] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'qlnv', N'ON'
GO
ALTER DATABASE [qlnv] SET QUERY_STORE = OFF
GO
USE [qlnv]
GO
/****** Object:  User [NVU04]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVU04] FOR LOGIN [NVU04] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NVU03]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVU03] FOR LOGIN [NVU03] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NVU02]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVU02] FOR LOGIN [NVU02] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NVU01]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVU01] FOR LOGIN [NVU01] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NVRead]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVRead] FOR LOGIN [NVRead] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NVProfile]    Script Date: 12/20/2022 6:13:20 PM ******/
CREATE USER [NVProfile] FOR LOGIN [NVProfile] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [NVU01]
GO
ALTER ROLE [db_datareader] ADD MEMBER [NVRead]
GO
GRANT ALTER TO [NVProfile] AS [dbo]
GO
GRANT CONNECT TO [NVProfile] AS [dbo]
GO
GRANT CONNECT TO [NVRead] AS [dbo]
GO
GRANT CONNECT TO [NVU01] AS [dbo]
GO
GRANT CREATE TABLE TO [NVU01] AS [dbo]
GO
DENY CREATE TABLE TO [NVU02] AS [dbo]
GO
DENY DELETE TO [NVU02] AS [dbo]
GO
GRANT CONNECT TO [NVU02] AS [dbo]
GO
GRANT UPDATE TO [NVU02] AS [dbo]
GO
GRANT CONNECT TO [NVU03] AS [dbo]
GO
GRANT CONNECT TO [NVU04] AS [dbo]
GO
GRANT VIEW ANY COLUMN ENCRYPTION KEY DEFINITION TO [public] AS [dbo]
GO
GRANT VIEW ANY COLUMN MASTER KEY DEFINITION TO [public] AS [dbo]
GO
/****** Object:  Table [dbo].[CaLam]    Script Date: 12/20/2022 6:13:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CaLam](
	[MaCa] [int] IDENTITY(1,1) NOT NULL,
	[TenCa] [varchar](255) NOT NULL,
	[MoTa] [varchar](255) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[IsDisable] [bit] NULL,
	[ThoiGianBatDau] [varchar](50) NOT NULL,
	[ThoiGianKetThuc] [varchar](50) NOT NULL,
	[CreatedBy] [int] NULL,
 CONSTRAINT [PK__CaLam__27258E7B87873273] PRIMARY KEY CLUSTERED 
(
	[MaCa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietChucVu]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietChucVu](
	[MaCTCV] [int] IDENTITY(1,1) NOT NULL,
	[MaCV] [int] NOT NULL,
	[MaNV] [int] NOT NULL,
	[NgayNhanChuc] [datetime] NOT NULL,
	[CreateAt] [datetime] NOT NULL,
	[UpdateAt] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK__ChiTietC__1E4E48C77D456F94] PRIMARY KEY CLUSTERED 
(
	[MaCTCV] ASC,
	[MaCV] ASC,
	[MaNV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChucVu]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucVu](
	[MaCV] [int] IDENTITY(1,1) NOT NULL,
	[TenChucVu] [varchar](100) NOT NULL,
	[PhuCap] [numeric](18, 2) NOT NULL,
	[GhiChu] [varchar](500) NOT NULL,
	[CreateAt] [datetime] NOT NULL,
	[UpdateAt] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
	[IsFullTime] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaCV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DangKyLichLam]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DangKyLichLam](
	[MaLichLam] [int] IDENTITY(1,1) NOT NULL,
	[NgayDangKy] [datetime] NOT NULL,
	[GioLam] [int] NOT NULL,
	[TrangThai] [varchar](50) NULL,
	[CreateAt] [datetime] NOT NULL,
	[UpdateAt] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
	[MaNV] [int] NULL,
	[MaCa] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichLam] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DieuChinhLuong]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DieuChinhLuong](
	[MaDCL] [int] IDENTITY(1,1) NOT NULL,
	[SoQuyetDinh] [varchar](50) NOT NULL,
	[NgayKyKet] [datetime] NOT NULL,
	[NgayDieuChinhLuong] [datetime] NOT NULL,
	[SoLuongMoi] [numeric](18, 2) NULL,
	[CreateAt] [datetime] NOT NULL,
	[MaNV] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDCL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhenThuong]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhenThuong](
	[SoQD] [int] IDENTITY(1,1) NOT NULL,
	[NgayQD] [datetime] NOT NULL,
	[Ten] [varchar](100) NOT NULL,
	[Loai] [varchar](100) NOT NULL,
	[HinhThuc] [varchar](100) NOT NULL,
	[SoTien] [numeric](18, 2) NOT NULL,
	[NoiDung] [varchar](100) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[IsDeleted] [bit] NULL,
	[MaNV] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[SoQD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Luong]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Luong](
	[MaLuong] [int] IDENTITY(1,1) NOT NULL,
	[Luong] [numeric](18, 2) NOT NULL,
	[KhoanTru] [numeric](18, 2) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[IsDeleted] [bit] NULL,
	[MaNV] [int] NULL,
	[PhuCap] [numeric](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLuong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
GRANT DELETE ON [dbo].[Luong] TO [NVU03] AS [dbo]
GO
GRANT INSERT ON [dbo].[Luong] TO [NVU03] AS [dbo]
GO
GRANT SELECT ON [dbo].[Luong] TO [NVU03] AS [dbo]
GO
GRANT UPDATE ON [dbo].[Luong] TO [NVU03] AS [dbo]
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhanVien](
	[MaNV] [int] IDENTITY(1,1) NOT NULL,
	[TenNV] [nvarchar](50) NOT NULL,
	[NgaySinh] [date] NOT NULL,
	[DiaChi] [nvarchar](100) NOT NULL,
	[GioiTinh] [bit] NULL,
	[DienThoai] [nvarchar](100) NOT NULL,
	[SoCCCD] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[CreateAt] [datetime] NOT NULL,
	[UpdateAt] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
	[MaTDHV] [int] NULL,
 CONSTRAINT [PK__NhanVien__2725D70A342F5164] PRIMARY KEY CLUSTERED 
(
	[MaNV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[MaRole] [int] IDENTITY(1,1) NOT NULL,
	[Rolename] [varchar](20) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaRole] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[MaTaiKhoan] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](20) NOT NULL,
	[Password] [varchar](200) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
	[IsDeleted] [bit] NULL,
	[MaRole] [int] NULL,
	[MaNV] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTaiKhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TrinhDoHocVan]    Script Date: 12/20/2022 6:13:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrinhDoHocVan](
	[MaTDHV] [int] IDENTITY(1,1) NOT NULL,
	[TenTDHV] [varchar](50) NOT NULL,
	[CreateAt] [datetime] NOT NULL,
	[UpdateAt] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTDHV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CaLam] ON 

INSERT [dbo].[CaLam] ([MaCa], [TenCa], [MoTa], [CreatedAt], [UpdatedAt], [IsDisable], [ThoiGianBatDau], [ThoiGianKetThuc], [CreatedBy]) VALUES (3, N'Ca sáng', N'ca sáng', CAST(N'2022-11-16T00:44:09.797' AS DateTime), CAST(N'2022-11-16T00:44:09.797' AS DateTime), 0, N'06:00:00', N'11:30:00', 9)
INSERT [dbo].[CaLam] ([MaCa], [TenCa], [MoTa], [CreatedAt], [UpdatedAt], [IsDisable], [ThoiGianBatDau], [ThoiGianKetThuc], [CreatedBy]) VALUES (4, N'Ca chieu', N'ca chieu', CAST(N'2022-11-16T00:44:54.603' AS DateTime), CAST(N'2022-11-16T00:44:54.603' AS DateTime), 0, N'11:30:00', N'18:30:00', 9)
INSERT [dbo].[CaLam] ([MaCa], [TenCa], [MoTa], [CreatedAt], [UpdatedAt], [IsDisable], [ThoiGianBatDau], [ThoiGianKetThuc], [CreatedBy]) VALUES (5, N'Ca Toi', N'ca toi', CAST(N'2022-11-16T00:46:38.813' AS DateTime), CAST(N'2022-11-16T00:46:38.813' AS DateTime), 0, N'18:30:00', N'22:30:00', 9)
INSERT [dbo].[CaLam] ([MaCa], [TenCa], [MoTa], [CreatedAt], [UpdatedAt], [IsDisable], [ThoiGianBatDau], [ThoiGianKetThuc], [CreatedBy]) VALUES (6, N'Full-time', N'fulltime', CAST(N'2022-11-16T00:47:39.543' AS DateTime), CAST(N'2022-11-16T00:47:39.543' AS DateTime), 0, N'06:30:00', N'15:30:00', 9)
SET IDENTITY_INSERT [dbo].[CaLam] OFF
GO
SET IDENTITY_INSERT [dbo].[ChiTietChucVu] ON 

INSERT [dbo].[ChiTietChucVu] ([MaCTCV], [MaCV], [MaNV], [NgayNhanChuc], [CreateAt], [UpdateAt], [IsDelete]) VALUES (1, 18, 5, CAST(N'2022-12-14T05:39:05.010' AS DateTime), CAST(N'2022-12-14T05:39:10.950' AS DateTime), CAST(N'2022-12-14T05:39:10.950' AS DateTime), 1)
INSERT [dbo].[ChiTietChucVu] ([MaCTCV], [MaCV], [MaNV], [NgayNhanChuc], [CreateAt], [UpdateAt], [IsDelete]) VALUES (2, 20, 5, CAST(N'2022-12-14T05:42:35.453' AS DateTime), CAST(N'2022-12-14T05:42:41.870' AS DateTime), CAST(N'2022-12-14T05:42:41.870' AS DateTime), 0)
INSERT [dbo].[ChiTietChucVu] ([MaCTCV], [MaCV], [MaNV], [NgayNhanChuc], [CreateAt], [UpdateAt], [IsDelete]) VALUES (3, 20, 18, CAST(N'2022-12-15T17:05:19.973' AS DateTime), CAST(N'2022-12-15T17:05:26.723' AS DateTime), CAST(N'2022-12-15T17:05:26.723' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[ChiTietChucVu] OFF
GO
SET IDENTITY_INSERT [dbo].[ChucVu] ON 

INSERT [dbo].[ChucVu] ([MaCV], [TenChucVu], [PhuCap], [GhiChu], [CreateAt], [UpdateAt], [IsDelete], [IsFullTime]) VALUES (18, N'Nhân viên 4', CAST(100000.00 AS Numeric(18, 2)), N'blalba', CAST(N'2022-11-20T11:25:07.127' AS DateTime), CAST(N'2022-11-20T11:26:27.820' AS DateTime), 1, 1)
INSERT [dbo].[ChucVu] ([MaCV], [TenChucVu], [PhuCap], [GhiChu], [CreateAt], [UpdateAt], [IsDelete], [IsFullTime]) VALUES (19, N'Nhân viên full-time', CAST(500000.00 AS Numeric(18, 2)), N'aloalo', CAST(N'2022-12-14T12:41:06.813' AS DateTime), CAST(N'2022-12-14T12:41:06.813' AS DateTime), 0, 1)
INSERT [dbo].[ChucVu] ([MaCV], [TenChucVu], [PhuCap], [GhiChu], [CreateAt], [UpdateAt], [IsDelete], [IsFullTime]) VALUES (20, N'Nhân viên bán hàng', CAST(100000.00 AS Numeric(18, 2)), N'uh', CAST(N'2022-12-14T12:41:34.913' AS DateTime), CAST(N'2022-12-14T12:41:34.913' AS DateTime), 0, 0)
SET IDENTITY_INSERT [dbo].[ChucVu] OFF
GO
SET IDENTITY_INSERT [dbo].[DangKyLichLam] ON 

INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (1, CAST(N'2022-11-20T05:26:24.783' AS DateTime), 5, N'PENDING', CAST(N'2022-11-20T12:26:30.420' AS DateTime), CAST(N'2022-11-20T12:26:30.420' AS DateTime), 0, 2, 3)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (2, CAST(N'2022-11-25T05:26:24.000' AS DateTime), 7, N'PENDING', CAST(N'2022-11-20T12:26:39.460' AS DateTime), CAST(N'2022-11-20T12:26:39.460' AS DateTime), 0, 2, 4)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (3, CAST(N'2022-11-30T05:26:24.000' AS DateTime), 4, N'PENDING', CAST(N'2022-11-20T12:26:47.060' AS DateTime), CAST(N'2022-11-20T12:26:47.060' AS DateTime), 0, 2, 5)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (4, CAST(N'2022-11-28T05:26:24.000' AS DateTime), 5, N'PENDING', CAST(N'2022-11-20T12:27:35.617' AS DateTime), CAST(N'2022-11-20T12:27:35.617' AS DateTime), 0, 2, 3)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (5, CAST(N'2022-12-14T05:06:29.147' AS DateTime), 5, N'DONE', CAST(N'2022-12-14T12:06:37.500' AS DateTime), CAST(N'2022-12-14T05:08:22.177' AS DateTime), 0, 2, 3)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (6, CAST(N'2022-12-22T05:06:29.000' AS DateTime), 7, N'DONE', CAST(N'2022-12-14T12:06:49.427' AS DateTime), CAST(N'2022-12-14T05:08:24.227' AS DateTime), 0, 2, 4)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (7, CAST(N'2022-12-28T05:06:29.000' AS DateTime), 4, N'DONE', CAST(N'2022-12-14T12:06:56.857' AS DateTime), CAST(N'2022-12-14T05:08:28.783' AS DateTime), 0, 2, 5)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (8, CAST(N'2022-12-23T05:06:29.000' AS DateTime), 7, N'DONE', CAST(N'2022-12-14T12:07:04.257' AS DateTime), CAST(N'2022-12-14T05:08:26.647' AS DateTime), 0, 2, 4)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (9, CAST(N'2022-12-14T05:38:22.647' AS DateTime), 5, N'DONE', CAST(N'2022-12-14T12:38:27.997' AS DateTime), CAST(N'2022-12-14T05:39:52.043' AS DateTime), 0, 5, 3)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (10, CAST(N'2022-12-28T05:38:22.000' AS DateTime), 7, N'DONE', CAST(N'2022-12-14T12:38:34.803' AS DateTime), CAST(N'2022-12-14T05:39:55.113' AS DateTime), 0, 5, 4)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (11, CAST(N'2022-12-30T05:38:22.000' AS DateTime), 4, N'DONE', CAST(N'2022-12-14T12:38:41.620' AS DateTime), CAST(N'2022-12-14T05:39:57.467' AS DateTime), 0, 5, 5)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (12, CAST(N'2022-12-15T17:05:48.387' AS DateTime), 5, N'DONE', CAST(N'2022-12-16T00:05:52.593' AS DateTime), CAST(N'2022-12-15T17:06:30.293' AS DateTime), 1, 18, 3)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (13, CAST(N'2022-12-20T17:05:48.000' AS DateTime), 7, N'DONE', CAST(N'2022-12-16T00:05:58.793' AS DateTime), CAST(N'2022-12-15T17:06:32.730' AS DateTime), 1, 18, 4)
INSERT [dbo].[DangKyLichLam] ([MaLichLam], [NgayDangKy], [GioLam], [TrangThai], [CreateAt], [UpdateAt], [IsDelete], [MaNV], [MaCa]) VALUES (14, CAST(N'2022-12-28T17:05:48.000' AS DateTime), 4, N'DONE', CAST(N'2022-12-16T00:06:05.363' AS DateTime), CAST(N'2022-12-15T17:06:35.317' AS DateTime), 1, 18, 5)
SET IDENTITY_INSERT [dbo].[DangKyLichLam] OFF
GO
SET IDENTITY_INSERT [dbo].[DieuChinhLuong] ON 

INSERT [dbo].[DieuChinhLuong] ([MaDCL], [SoQuyetDinh], [NgayKyKet], [NgayDieuChinhLuong], [SoLuongMoi], [CreateAt], [MaNV]) VALUES (6, N'QD03', CAST(N'2022-11-20T05:25:07.960' AS DateTime), CAST(N'2022-11-22T04:27:06.000' AS DateTime), CAST(1000000.00 AS Numeric(18, 2)), CAST(N'2022-11-20T12:24:57.077' AS DateTime), 4)
INSERT [dbo].[DieuChinhLuong] ([MaDCL], [SoQuyetDinh], [NgayKyKet], [NgayDieuChinhLuong], [SoLuongMoi], [CreateAt], [MaNV]) VALUES (7, N'QD01', CAST(N'2022-12-14T05:09:23.007' AS DateTime), CAST(N'2022-12-14T05:09:23.007' AS DateTime), CAST(1500000.00 AS Numeric(18, 2)), CAST(N'2022-12-14T12:09:44.353' AS DateTime), 2)
INSERT [dbo].[DieuChinhLuong] ([MaDCL], [SoQuyetDinh], [NgayKyKet], [NgayDieuChinhLuong], [SoLuongMoi], [CreateAt], [MaNV]) VALUES (8, N'QD01', CAST(N'2022-12-14T05:39:15.007' AS DateTime), CAST(N'2022-12-14T05:39:15.007' AS DateTime), CAST(2000000.00 AS Numeric(18, 2)), CAST(N'2022-12-14T12:39:29.660' AS DateTime), 5)
INSERT [dbo].[DieuChinhLuong] ([MaDCL], [SoQuyetDinh], [NgayKyKet], [NgayDieuChinhLuong], [SoLuongMoi], [CreateAt], [MaNV]) VALUES (9, N'QD03', CAST(N'2022-12-15T17:05:28.720' AS DateTime), CAST(N'2022-12-15T17:05:28.720' AS DateTime), CAST(1000000.00 AS Numeric(18, 2)), CAST(N'2022-12-16T00:05:38.880' AS DateTime), 18)
SET IDENTITY_INSERT [dbo].[DieuChinhLuong] OFF
GO
SET IDENTITY_INSERT [dbo].[Luong] ON 

INSERT [dbo].[Luong] ([MaLuong], [Luong], [KhoanTru], [CreatedAt], [UpdatedAt], [IsDeleted], [MaNV], [PhuCap]) VALUES (1, CAST(16100000.00 AS Numeric(18, 2)), CAST(0.00 AS Numeric(18, 2)), CAST(N'2022-12-16T00:09:47.690' AS DateTime), CAST(N'2022-12-16T00:09:47.690' AS DateTime), 1, 18, CAST(0.00 AS Numeric(18, 2)))
SET IDENTITY_INSERT [dbo].[Luong] OFF
GO
SET IDENTITY_INSERT [dbo].[NhanVien] ON 

INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (1, N'Duong Suong', CAST(N'2001-03-14' AS Date), N'97 Man Thien', 0, N'012390123123', N'11881823123', N'duongsuong@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 0, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (2, N'Nguyễn Văn A', CAST(N'1999-06-14' AS Date), N'TPHCM', 1, N'0123476433', N'987654323456', N'nva@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (3, N'Phạm văn B', CAST(N'2001-06-14' AS Date), N'Đồng Nai', 1, N'0945273282', N'456789997522', N'pvb@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (4, N'Bùi E', CAST(N'1999-06-09' AS Date), N'TPHCM', 0, N'07254362524', N'679374326825', N'be@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (5, N'phạm hương', CAST(N'2001-06-14' AS Date), N'TPHCM', 0, N'0354369353', N'538353686537', N'ph@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (6, N'Nguyễn Thị D', CAST(N'2000-07-12' AS Date), N'Thủ Đức', 0, N'08425272426', N'426282247282', N'nd@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (7, N'đinh huân', CAST(N'1999-06-10' AS Date), N'TPHCM', 1, N'043638353', N'039635473', N'dh@gmail.com', CAST(N'2022-10-24T15:54:24.227' AS DateTime), CAST(N'2022-10-24T15:54:24.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (8, N'Hồng Dương', CAST(N'1997-12-20' AS Date), N'thành phố hồ chí minh', 1, N'0263427342', N'452725148233', N'hd@gmail.com', CAST(N'2022-12-14T12:45:56.363' AS DateTime), CAST(N'2022-12-14T12:45:56.363' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (9, N'asdasd', CAST(N'2022-12-15' AS Date), N'Đồng Nai', 1, N'0842135889', N'452830624629', N'asdasd@gmail.com', CAST(N'2022-12-15T23:25:40.227' AS DateTime), CAST(N'2022-12-15T23:25:40.227' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (13, N'asdasddwq', CAST(N'2022-12-15' AS Date), N'Đồng Nai', 1, N'123123123', N'42123123', N'duongsuong121@gmail.com', CAST(N'2022-12-15T23:34:02.383' AS DateTime), CAST(N'2022-12-15T23:34:02.383' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (14, N'Nguyễn Văn Aaaa', CAST(N'2022-12-15' AS Date), N'Đồng Nai', 1, N'23124124', N'5123123123', N'duongsuong1ada5@gmail.com', CAST(N'2022-12-15T23:36:08.150' AS DateTime), CAST(N'2022-12-15T23:36:08.150' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (16, N'asdasdqd', CAST(N'2022-12-15' AS Date), N'Đồng Nai', 1, N'0842135889asd', N'538353686537sda', N'duongsuongwqw15@gmail.com', CAST(N'2022-12-15T23:58:31.627' AS DateTime), CAST(N'2022-12-15T23:58:31.627' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (18, N'Nguyễn Văn B', CAST(N'2022-12-16' AS Date), N'hà nội', 1, N'07252723', N'726242925', N'nvb@gmail.com', CAST(N'2022-12-16T00:04:11.347' AS DateTime), CAST(N'2022-12-16T00:04:11.347' AS DateTime), 1, NULL)
INSERT [dbo].[NhanVien] ([MaNV], [TenNV], [NgaySinh], [DiaChi], [GioiTinh], [DienThoai], [SoCCCD], [Email], [CreateAt], [UpdateAt], [IsDelete], [MaTDHV]) VALUES (19, N'Lê C', CAST(N'1997-10-15' AS Date), N'Đông Hà', 0, N'0282423262', N'435242742634', N'lec@gmail.com', CAST(N'2022-12-16T16:08:52.763' AS DateTime), CAST(N'2022-12-16T16:08:52.763' AS DateTime), 0, NULL)
SET IDENTITY_INSERT [dbo].[NhanVien] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([MaRole], [Rolename], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (1, N'Employee', CAST(N'2022-10-24T15:33:40.857' AS DateTime), CAST(N'2022-10-24T15:33:40.857' AS DateTime), 0)
INSERT [dbo].[Role] ([MaRole], [Rolename], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (2, N'Manager', CAST(N'2022-10-24T15:38:19.793' AS DateTime), CAST(N'2022-10-24T15:38:19.793' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 

INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (3, N'nva', N'$2b$10$8ufNvxCuzahz2E1sFjXfPOKZpN5UuGfjU2O0qa/xQG/NXYmBkxive', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 1, 2)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (4, N'pvb', N'$2b$10$lxQbdiEtlFc1yhAztL0u5uFuIKpfTWSGI.Q/UxEJDcWRxIQiT.7sW', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 1, 3)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (5, N'be', N'$2b$10$KeWAEQBcpnyCpDUEpdRs/OVEs04tP1D0Af2zxLN28navLE4pfnsXC', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 1, 4)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (6, N'ph', N'$2b$10$l8KX4MpuLSP8BU1Am8lUb.AvTlEQrZoyQOUWXzmpvRwFGY45Neuse', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 1, 5)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (7, N'nd', N'$2b$10$/dZRHMkQHKREjFooaezpeODyMfRrL4J/Kg.5DCe.b8PjWmlXrp8YK', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 1, 1, 6)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (8, N'dh', N'$2b$10$CQVIG0UJ80DC0v5aXViX6e/O/.Z7.9ys5owISkgBUJtvo3mr3wg2K', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 1, 7)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (9, N'quanly', N'$2b$10$7y404zB6ZGrcUxoRcf9AgeFEQ02oaA.svrUqkStZP/tMQHjt3idvi', CAST(N'2022-10-24T16:02:37.467' AS DateTime), CAST(N'2022-10-24T16:02:37.467' AS DateTime), 0, 2, 1)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (10, N'nvb', N'$2b$10$6av.2tugn2fQ2svCztg7ke7fBg4SvbUkeuJP5HnsFwsiW9EJPWGHi', CAST(N'2022-12-15T17:04:52.850' AS DateTime), CAST(N'2022-12-15T17:04:52.850' AS DateTime), 1, 1, 18)
INSERT [dbo].[TaiKhoan] ([MaTaiKhoan], [Username], [Password], [CreatedAt], [UpdatedAt], [IsDeleted], [MaRole], [MaNV]) VALUES (11, N'lec', N'$2b$10$ku03586rCDqx7Y2PmO1ye.lfvHOdYnhS9xhyP0cVuRrdstO0vuB9G', CAST(N'2022-12-16T09:13:41.133' AS DateTime), CAST(N'2022-12-16T09:13:41.133' AS DateTime), 0, 1, 19)
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uni_dienthoai]    Script Date: 12/20/2022 6:13:21 PM ******/
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [uni_dienthoai] UNIQUE NONCLUSTERED 
(
	[DienThoai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uni_email]    Script Date: 12/20/2022 6:13:21 PM ******/
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [uni_email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uni_socccd]    Script Date: 12/20/2022 6:13:21 PM ******/
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [uni_socccd] UNIQUE NONCLUSTERED 
(
	[SoCCCD] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CaLam] ADD  CONSTRAINT [DF__CaLam__CreateAt__5441852A]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[CaLam] ADD  CONSTRAINT [DF__CaLam__UpdateAt__5535A963]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[CaLam] ADD  CONSTRAINT [DF__CaLam__IsDisable__5629CD9C]  DEFAULT ('false') FOR [IsDisable]
GO
ALTER TABLE [dbo].[ChiTietChucVu] ADD  DEFAULT (getdate()) FOR [NgayNhanChuc]
GO
ALTER TABLE [dbo].[ChiTietChucVu] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[ChiTietChucVu] ADD  DEFAULT (getdate()) FOR [UpdateAt]
GO
ALTER TABLE [dbo].[ChiTietChucVu] ADD  DEFAULT ('false') FOR [IsDelete]
GO
ALTER TABLE [dbo].[ChucVu] ADD  DEFAULT ((0)) FOR [PhuCap]
GO
ALTER TABLE [dbo].[ChucVu] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[ChucVu] ADD  DEFAULT (getdate()) FOR [UpdateAt]
GO
ALTER TABLE [dbo].[ChucVu] ADD  DEFAULT ('false') FOR [IsDelete]
GO
ALTER TABLE [dbo].[ChucVu] ADD  DEFAULT ('false') FOR [IsFullTime]
GO
ALTER TABLE [dbo].[DangKyLichLam] ADD  DEFAULT (getdate()) FOR [NgayDangKy]
GO
ALTER TABLE [dbo].[DangKyLichLam] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[DangKyLichLam] ADD  DEFAULT (getdate()) FOR [UpdateAt]
GO
ALTER TABLE [dbo].[DangKyLichLam] ADD  DEFAULT ('false') FOR [IsDelete]
GO
ALTER TABLE [dbo].[DieuChinhLuong] ADD  DEFAULT (getdate()) FOR [NgayKyKet]
GO
ALTER TABLE [dbo].[DieuChinhLuong] ADD  DEFAULT (getdate()) FOR [NgayDieuChinhLuong]
GO
ALTER TABLE [dbo].[DieuChinhLuong] ADD  DEFAULT ((0)) FOR [SoLuongMoi]
GO
ALTER TABLE [dbo].[DieuChinhLuong] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[KhenThuong] ADD  DEFAULT (getdate()) FOR [NgayQD]
GO
ALTER TABLE [dbo].[KhenThuong] ADD  DEFAULT ((0)) FOR [SoTien]
GO
ALTER TABLE [dbo].[KhenThuong] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[KhenThuong] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[KhenThuong] ADD  DEFAULT ('false') FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Luong] ADD  DEFAULT ((0)) FOR [Luong]
GO
ALTER TABLE [dbo].[Luong] ADD  DEFAULT ((0)) FOR [KhoanTru]
GO
ALTER TABLE [dbo].[Luong] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Luong] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Luong] ADD  DEFAULT ('false') FOR [IsDeleted]
GO
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [DF__NhanVien__GioiTi__276EDEB3]  DEFAULT ('false') FOR [GioiTinh]
GO
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [DF__NhanVien__Create__286302EC]  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [DF__NhanVien__Update__29572725]  DEFAULT (getdate()) FOR [UpdateAt]
GO
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [DF__NhanVien__IsDele__2A4B4B5E]  DEFAULT ('false') FOR [IsDelete]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Role] ADD  DEFAULT ('false') FOR [IsDeleted]
GO
ALTER TABLE [dbo].[TaiKhoan] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[TaiKhoan] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[TaiKhoan] ADD  DEFAULT ('false') FOR [IsDeleted]
GO
ALTER TABLE [dbo].[TrinhDoHocVan] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[TrinhDoHocVan] ADD  DEFAULT (getdate()) FOR [UpdateAt]
GO
ALTER TABLE [dbo].[TrinhDoHocVan] ADD  DEFAULT ('false') FOR [IsDelete]
GO
ALTER TABLE [dbo].[CaLam]  WITH CHECK ADD  CONSTRAINT [fk_createby] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[TaiKhoan] ([MaTaiKhoan])
GO
ALTER TABLE [dbo].[CaLam] CHECK CONSTRAINT [fk_createby]
GO
ALTER TABLE [dbo].[ChiTietChucVu]  WITH CHECK ADD  CONSTRAINT [fk_macv2] FOREIGN KEY([MaCV])
REFERENCES [dbo].[ChucVu] ([MaCV])
GO
ALTER TABLE [dbo].[ChiTietChucVu] CHECK CONSTRAINT [fk_macv2]
GO
ALTER TABLE [dbo].[ChiTietChucVu]  WITH CHECK ADD  CONSTRAINT [fk_manv5] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[ChiTietChucVu] CHECK CONSTRAINT [fk_manv5]
GO
ALTER TABLE [dbo].[DangKyLichLam]  WITH CHECK ADD  CONSTRAINT [fk_maca] FOREIGN KEY([MaCa])
REFERENCES [dbo].[CaLam] ([MaCa])
GO
ALTER TABLE [dbo].[DangKyLichLam] CHECK CONSTRAINT [fk_maca]
GO
ALTER TABLE [dbo].[DangKyLichLam]  WITH CHECK ADD  CONSTRAINT [fk_manv4] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[DangKyLichLam] CHECK CONSTRAINT [fk_manv4]
GO
ALTER TABLE [dbo].[DieuChinhLuong]  WITH CHECK ADD  CONSTRAINT [fk_manv3] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[DieuChinhLuong] CHECK CONSTRAINT [fk_manv3]
GO
ALTER TABLE [dbo].[KhenThuong]  WITH CHECK ADD  CONSTRAINT [fk_manv2] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[KhenThuong] CHECK CONSTRAINT [fk_manv2]
GO
ALTER TABLE [dbo].[Luong]  WITH CHECK ADD  CONSTRAINT [fk_manv1] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[Luong] CHECK CONSTRAINT [fk_manv1]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [fk_matdhv] FOREIGN KEY([MaTDHV])
REFERENCES [dbo].[TrinhDoHocVan] ([MaTDHV])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [fk_matdhv]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [fk_manv] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [fk_manv]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [fk_marole] FOREIGN KEY([MaRole])
REFERENCES [dbo].[Role] ([MaRole])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [fk_marole]
GO
USE [master]
GO
ALTER DATABASE [qlnv] SET  READ_WRITE 
GO
