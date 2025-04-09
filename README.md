# Linking OSPF and EIGRP Networks with Redistribution

![project-view](https://github.com/user-attachments/assets/778c6ff1-2182-44f3-9686-6eb4d69d91a6)

## Project Overview

This project focuses on designing and implementing two distinct enterprise networks using Open Shortest Path First (OSPF) and Enhanced Interior Gateway Routing Protocol (EIGRP).

OSPF, a link-state protocol, and EIGRP, a distance-vector protocol, are configured within separate domains to meet specific network requirements. The core objective is to enable communication between these two protocols using route redistribution, ensuring efficient and seamless data exchange across both networks.

## Key Features

- Implementation of OSPF in a multi-area design (Areas 0, 1, 2, and 3)
- Configuration of multiple EIGRP autonomous systems (AS 1, AS 2, and AS 3)
- Route redistribution between OSPF and EIGRP domains
- End-to-end connectivity across different routing protocols
- Comprehensive network addressing scheme

## Technologies Used

- GNS3 Network Simulation
- Cisco IOS
- OSPF Routing Protocol
- EIGRP Routing Protocol
- Route Redistribution

## Network Topology

The network consists of:
- A backbone OSPF area (Area 0) connected to multiple non-backbone areas
- Multiple EIGRP autonomous systems
- Redistribution points that connect the OSPF and EIGRP domains

## Website

A companion website for this project is available in this repository. Open `index.html` in a web browser to view detailed information about the implementation, configuration, and results.

## Implementation Highlights

- OSPF configured with proper area design and interface cost considerations
- EIGRP configured with appropriate autonomous systems
- Route redistribution implemented with proper metrics
- Verification of end-to-end connectivity across all network segments

## Learning Outcomes

This project demonstrates the ability to:
- Design and implement multi-protocol routing environments
- Configure and troubleshoot OSPF and EIGRP routing
- Implement route redistribution between different routing protocols
- Manage and optimize path selection in complex networks
 